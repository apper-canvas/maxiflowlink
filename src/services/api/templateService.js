const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const templateService = {
  getAll: async () => {
    try {
      const response = await apperClient.fetchRecords('template_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "usage_count_c"}},
          {"field": {"Name": "apps_c"}},
          {"field": {"Name": "nodes_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return (response.data || []).map(t => ({
        Id: t.Id,
        name: t.name_c || '',
        description: t.description_c || '',
        category: t.category_c || '',
        icon: t.icon_c || '',
        usageCount: t.usage_count_c || 0,
        apps: t.apps_c ? JSON.parse(t.apps_c) : [],
        nodes: t.nodes_c ? JSON.parse(t.nodes_c) : []
      }));
    } catch (error) {
      console.info(`apper_info: Got this error in templateService.getAll: ${error.message}`);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await apperClient.getRecordById('template_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "usage_count_c"}},
          {"field": {"Name": "apps_c"}},
          {"field": {"Name": "nodes_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Template not found");
      }

      const t = response.data;
      return {
        Id: t.Id,
        name: t.name_c || '',
        description: t.description_c || '',
        category: t.category_c || '',
        icon: t.icon_c || '',
        usageCount: t.usage_count_c || 0,
        apps: t.apps_c ? JSON.parse(t.apps_c) : [],
        nodes: t.nodes_c ? JSON.parse(t.nodes_c) : []
      };
    } catch (error) {
      console.info(`apper_info: Got this error in templateService.getById: ${error.message}`);
      throw error;
    }
  },

  getByCategory: async (category) => {
    try {
      const response = await apperClient.fetchRecords('template_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "usage_count_c"}},
          {"field": {"Name": "apps_c"}},
          {"field": {"Name": "nodes_c"}}
        ],
        where: [{"FieldName": "category_c", "Operator": "EqualTo", "Values": [category]}]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return (response.data || []).map(t => ({
        Id: t.Id,
        name: t.name_c || '',
        description: t.description_c || '',
        category: t.category_c || '',
        icon: t.icon_c || '',
        usageCount: t.usage_count_c || 0,
        apps: t.apps_c ? JSON.parse(t.apps_c) : [],
        nodes: t.nodes_c ? JSON.parse(t.nodes_c) : []
      }));
    } catch (error) {
      console.info(`apper_info: Got this error in templateService.getByCategory: ${error.message}`);
      throw error;
    }
  },

  getPopular: async (limit = 6) => {
    try {
      const response = await apperClient.fetchRecords('template_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "usage_count_c"}},
          {"field": {"Name": "apps_c"}},
          {"field": {"Name": "nodes_c"}}
        ],
        orderBy: [{"fieldName": "usage_count_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": limit, "offset": 0}
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return (response.data || []).map(t => ({
        Id: t.Id,
        name: t.name_c || '',
        description: t.description_c || '',
        category: t.category_c || '',
        icon: t.icon_c || '',
        usageCount: t.usage_count_c || 0,
        apps: t.apps_c ? JSON.parse(t.apps_c) : [],
        nodes: t.nodes_c ? JSON.parse(t.nodes_c) : []
      }));
    } catch (error) {
      console.info(`apper_info: Got this error in templateService.getPopular: ${error.message}`);
      throw error;
    }
  }
};
export default templateService;