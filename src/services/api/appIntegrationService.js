import appIntegrationsData from "../mockData/appIntegrations.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let appIntegrations = [...appIntegrationsData];

const appIntegrationService = {
  getAll: async () => {
    await delay(250);
    return [...appIntegrations];
  },

  getById: async (id) => {
    await delay(200);
    const app = appIntegrations.find(a => a.Id === parseInt(id));
    if (!app) throw new Error("App integration not found");
    return { ...app };
  },

  getByCategory: async (category) => {
    await delay(200);
    return appIntegrations.filter(app => app.category === category);
  },

  search: async (query) => {
    await delay(200);
    const lowerQuery = query.toLowerCase();
    return appIntegrations.filter(app => 
      app.name.toLowerCase().includes(lowerQuery) ||
      app.category.toLowerCase().includes(lowerQuery) ||
      app.description.toLowerCase().includes(lowerQuery)
    );
  }
};

export default appIntegrationService;