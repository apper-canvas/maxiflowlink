import executionLogsData from "../mockData/executionLogs.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let executionLogs = [...executionLogsData];

const executionLogService = {
  getAll: async () => {
    await delay(300);
    return [...executionLogs].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
  },

  getByWorkflowId: async (workflowId) => {
    await delay(250);
    return executionLogs
      .filter(log => log.workflowId === parseInt(workflowId))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  getById: async (id) => {
    await delay(200);
    const log = executionLogs.find(l => l.Id === parseInt(id));
    if (!log) throw new Error("Execution log not found");
    return { ...log };
  },

  getRecent: async (limit = 20) => {
    await delay(250);
    return [...executionLogs]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }
};

export default executionLogService;