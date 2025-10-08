import templatesData from "../mockData/templates.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let templates = [...templatesData];

const templateService = {
  getAll: async () => {
    await delay(300);
    return [...templates];
  },

  getById: async (id) => {
    await delay(200);
    const template = templates.find(t => t.Id === parseInt(id));
    if (!template) throw new Error("Template not found");
    return { ...template };
  },

  getByCategory: async (category) => {
    await delay(200);
    return templates.filter(t => t.category === category);
  },

  getPopular: async (limit = 6) => {
    await delay(200);
    return [...templates]
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, limit);
  }
};

export default templateService;