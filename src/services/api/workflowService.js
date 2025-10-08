import workflowsData from "../mockData/workflows.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let workflows = [...workflowsData];

const workflowService = {
  getAll: async () => {
    await delay(300);
    return [...workflows];
  },

  getById: async (id) => {
    await delay(250);
    const workflow = workflows.find(w => w.Id === parseInt(id));
    if (!workflow) throw new Error("Workflow not found");
    return { ...workflow };
  },

  create: async (workflowData) => {
    await delay(400);
    const maxId = Math.max(...workflows.map(w => w.Id), 0);
    const newWorkflow = {
      Id: maxId + 1,
      name: workflowData.name || "Untitled Workflow",
      description: workflowData.description || "",
      isActive: false,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      lastRun: null,
      runCount: 0,
      nodes: workflowData.nodes || [],
      connections: workflowData.connections || []
    };
    workflows.push(newWorkflow);
    return { ...newWorkflow };
  },

  update: async (id, updates) => {
    await delay(350);
    const index = workflows.findIndex(w => w.Id === parseInt(id));
    if (index === -1) throw new Error("Workflow not found");
    
    workflows[index] = {
      ...workflows[index],
      ...updates,
      lastModified: new Date().toISOString()
    };
    return { ...workflows[index] };
  },

  delete: async (id) => {
    await delay(300);
    const index = workflows.findIndex(w => w.Id === parseInt(id));
    if (index === -1) throw new Error("Workflow not found");
    
    workflows.splice(index, 1);
    return { success: true };
  },

  toggleActive: async (id) => {
    await delay(250);
    const index = workflows.findIndex(w => w.Id === parseInt(id));
    if (index === -1) throw new Error("Workflow not found");
    
    workflows[index].isActive = !workflows[index].isActive;
    workflows[index].lastModified = new Date().toISOString();
    return { ...workflows[index] };
  }
};

export default workflowService;