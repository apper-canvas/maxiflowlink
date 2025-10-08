const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const appIntegrationService = {
  getAll: async () => {
    try {
      const response = await apperClient.fetchRecords('app_integration_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "triggers_c"}},
          {"field": {"Name": "actions_c"}},
          {"field": {"Name": "auth_type_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return (response.data || []).map(a => ({
        Id: a.Id,
        name: a.name_c || '',
        icon: a.icon_c || '',
        category: a.category_c || '',
        description: a.description_c || '',
        color: a.color_c || '',
        triggers: a.triggers_c ? JSON.parse(a.triggers_c) : [],
        actions: a.actions_c ? JSON.parse(a.actions_c) : [],
        authType: a.auth_type_c || ''
      }));
    } catch (error) {
      console.info(`apper_info: Got this error in appIntegrationService.getAll: ${error.message}`);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await apperClient.getRecordById('app_integration_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "triggers_c"}},
          {"field": {"Name": "actions_c"}},
          {"field": {"Name": "auth_type_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("App integration not found");
      }

      const a = response.data;
      return {
        Id: a.Id,
        name: a.name_c || '',
        icon: a.icon_c || '',
        category: a.category_c || '',
        description: a.description_c || '',
        color: a.color_c || '',
        triggers: a.triggers_c ? JSON.parse(a.triggers_c) : [],
        actions: a.actions_c ? JSON.parse(a.actions_c) : [],
        authType: a.auth_type_c || ''
      };
    } catch (error) {
      console.info(`apper_info: Got this error in appIntegrationService.getById: ${error.message}`);
      throw error;
    }
  },

  getByCategory: async (category) => {
    try {
      const response = await apperClient.fetchRecords('app_integration_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "triggers_c"}},
          {"field": {"Name": "actions_c"}},
          {"field": {"Name": "auth_type_c"}}
        ],
        where: [{"FieldName": "category_c", "Operator": "EqualTo", "Values": [category]}]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return (response.data || []).map(a => ({
        Id: a.Id,
        name: a.name_c || '',
        icon: a.icon_c || '',
        category: a.category_c || '',
        description: a.description_c || '',
        color: a.color_c || '',
        triggers: a.triggers_c ? JSON.parse(a.triggers_c) : [],
        actions: a.actions_c ? JSON.parse(a.actions_c) : [],
        authType: a.auth_type_c || ''
      }));
    } catch (error) {
      console.info(`apper_info: Got this error in appIntegrationService.getByCategory: ${error.message}`);
      throw error;
    }
  },

  search: async (query) => {
    try {
      const lowerQuery = query.toLowerCase();
      
      const response = await apperClient.fetchRecords('app_integration_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "triggers_c"}},
          {"field": {"Name": "actions_c"}},
          {"field": {"Name": "auth_type_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "name_c", "operator": "Contains", "values": [lowerQuery]}
              ],
              "operator": ""
            },
            {
              "conditions": [
                {"fieldName": "category_c", "operator": "Contains", "values": [lowerQuery]}
              ],
              "operator": ""
            },
            {
              "conditions": [
                {"fieldName": "description_c", "operator": "Contains", "values": [lowerQuery]}
              ],
              "operator": ""
            }
          ]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return (response.data || []).map(a => ({
        Id: a.Id,
        name: a.name_c || '',
        icon: a.icon_c || '',
        category: a.category_c || '',
        description: a.description_c || '',
        color: a.color_c || '',
        triggers: a.triggers_c ? JSON.parse(a.triggers_c) : [],
        actions: a.actions_c ? JSON.parse(a.actions_c) : [],
        authType: a.auth_type_c || ''
      }));
    } catch (error) {
      console.info(`apper_info: Got this error in appIntegrationService.search: ${error.message}`);
      throw error;
    }
  }
};

export default appIntegrationService;