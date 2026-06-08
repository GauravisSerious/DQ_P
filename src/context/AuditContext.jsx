import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { auditService } from "../services/auditService";

const AuditContext = createContext(null);

const initialState = {
  user: null,
  selectedGoals: new Set(),
  selectedAudit: "complete",
  userIdentity: "unknown",
  project: "demo-project",
  dataset: "analytics_294819481",
  table: "events_*",
  selectedCustomCategories: new Set(),
  auditProgress: { step: 0, total: 0, status: "Queued checks" },
  running: false,
  loading: false,
  error: null,
  scores: null,
  findings: [],
  recommendations: [],
  lastRunAt: null,
  showUseCaseModal: false,
  selectedUseCase: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, user: action.payload };
    case "SIGN_OUT":
      return { ...initialState, selectedGoals: new Set(), selectedCustomCategories: new Set() };
    case "TOGGLE_GOAL": {
      const next = new Set(state.selectedGoals);
      if (next.has(action.payload)) next.delete(action.payload);
      else next.add(action.payload);
      return { ...state, selectedGoals: next };
    }
    case "SET_AUDIT":
      return { ...state, selectedAudit: action.payload };
    case "SET_IDENTITY":
      return { ...state, userIdentity: action.payload };
    case "SET_PROJECT":
      return { ...state, project: action.payload };
    case "SET_DATASET":
      return { ...state, dataset: action.payload };
    case "SET_TABLE":
      return { ...state, table: action.payload };
    case "TOGGLE_CUSTOM_CATEGORY": {
      const next = new Set(state.selectedCustomCategories);
      if (next.has(action.payload)) next.delete(action.payload);
      else next.add(action.payload);
      return { ...state, selectedCustomCategories: next };
    }
    case "SET_PROGRESS":
      return { ...state, auditProgress: action.payload };
    case "SET_RUNNING":
      return { ...state, running: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_RESULTS":
      return {
        ...state,
        scores: action.payload.scores,
        findings: action.payload.findings,
        recommendations: action.payload.recommendations,
        lastRunAt: new Date().toISOString(),
      };
    case "OPEN_MODAL":
      return { ...state, showUseCaseModal: true, selectedUseCase: action.payload };
    case "CLOSE_MODAL":
      return { ...state, showUseCaseModal: false, selectedUseCase: null };
    case "RESET":
      return {
        ...initialState,
        user: state.user,
        selectedGoals: new Set(),
        selectedCustomCategories: new Set(),
        selectedAudit: state.selectedAudit
      };
    default:
      return state;
  }
}

export function AuditProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const raw = localStorage.getItem("dq-pulse-state");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.user) dispatch({ type: "SIGN_IN", payload: parsed.user });
    } catch {
      // ignore corrupted local data
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dq-pulse-state", JSON.stringify({ user: state.user }));
  }, [state.user]);

  const runAudit = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_RUNNING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    try {
      const result = await auditService.runAudit({
        audit: state.selectedAudit,
        goals: Array.from(state.selectedGoals),
        identity: state.userIdentity,
        project: state.project,
        dataset: state.dataset,
        table: state.table,
        customCategories: Array.from(state.selectedCustomCategories),
        onProgress: (progress) => dispatch({ type: "SET_PROGRESS", payload: progress }),
      });
      dispatch({ type: "SET_RESULTS", payload: result });
      dispatch({ type: "SET_RUNNING", payload: false });
      dispatch({ type: "SET_LOADING", payload: false });
      return result;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message || "Audit failed. Please retry." });
      dispatch({ type: "SET_RUNNING", payload: false });
      dispatch({ type: "SET_LOADING", payload: false });
      throw error;
    }
  };

  const api = useMemo(
    () => ({
      ...state,
      signIn: (email) => dispatch({ type: "SIGN_IN", payload: { email, name: email.split("@")[0] } }),
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      toggleGoal: (goal) => dispatch({ type: "TOGGLE_GOAL", payload: goal }),
      setAudit: (audit) => dispatch({ type: "SET_AUDIT", payload: audit }),
      setIdentity: (identity) => dispatch({ type: "SET_IDENTITY", payload: identity }),
      setProject: (project) => dispatch({ type: "SET_PROJECT", payload: project }),
      setDataset: (dataset) => dispatch({ type: "SET_DATASET", payload: dataset }),
      setTable: (table) => dispatch({ type: "SET_TABLE", payload: table }),
      toggleCustomCategory: (category) => dispatch({ type: "TOGGLE_CUSTOM_CATEGORY", payload: category }),
      setProgress: (progress) => dispatch({ type: "SET_PROGRESS", payload: progress }),
      openUseCaseModal: (item) => dispatch({ type: "OPEN_MODAL", payload: item }),
      closeUseCaseModal: () => dispatch({ type: "CLOSE_MODAL" }),
      runAudit,
      resetFlow: () => dispatch({ type: "RESET" }),
    }),
    [state, runAudit]
  );

  return <AuditContext.Provider value={api}>{children}</AuditContext.Provider>;
}

export function useAudit() {
  const value = useContext(AuditContext);
  if (!value) throw new Error("useAudit must be used inside AuditProvider");
  return value;
}
