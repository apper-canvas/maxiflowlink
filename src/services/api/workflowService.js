const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const workflowService = {
  getAll: async () => {
    try {
      const response = await apperClient.fetchRecords('workflow_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "is_active_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "last_modified_c"}},
          {"field": {"Name": "last_run_c"}},
          {"field": {"Name": "run_count_c"}},
          {"field": {"Name": "nodes_c"}},
          {"field": {"Name": "connections_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return (response.data || []).map(w => ({
        Id: w.Id,
        name: w.name_c || '',
        description: w.description_c || '',
        isActive: w.is_active_c || false,
        createdAt: w.created_at_c || null,
        lastModified: w.last_modified_c || null,
        lastRun: w.last_run_c || null,
        runCount: w.run_count_c || 0,
        nodes: w.nodes_c ? JSON.parse(w.nodes_c) : [],
        connections: w.connections_c ? JSON.parse(w.connections_c) : []
      }));
    } catch (error) {
      console.info(`apper_info: Got this error in workflowService.getAll: ${error.message}`);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await apperClient.getRecordById('workflow_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "is_active_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "last_modified_c"}},
          {"field": {"Name": "last_run_c"}},
          {"field": {"Name": "run_count_c"}},
          {"field": {"Name": "nodes_c"}},
          {"field": {"Name": "connections_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Workflow not found");
      }

      const w = response.data;
      return {
        Id: w.Id,
        name: w.name_c || '',
        description: w.description_c || '',
        isActive: w.is_active_c || false,
        createdAt: w.created_at_c || null,
        lastModified: w.last_modified_c || null,
        lastRun: w.last_run_c || null,
        runCount: w.run_count_c || 0,
        nodes: w.nodes_c ? JSON.parse(w.nodes_c) : [],
        connections: w.connections_c ? JSON.parse(w.connections_c) : []
      };
    } catch (error) {
      console.info(`apper_info: Got this error in workflowService.getById: ${error.message}`);
      throw error;
    }
  },

  create: async (workflowData) => {
    try {
      const response = await apperClient.createRecord('workflow_c', {
        records: [{
          name_c: workflowData.name || "Untitled Workflow",
          description_c: workflowData.description || "",
          is_active_c: false,
          created_at_c: new Date().toISOString(),
          last_modified_c: new Date().toISOString(),
          run_count_c: 0,
          nodes_c: JSON.stringify(workflowData.nodes || []),
          connections_c: JSON.stringify(workflowData.connections || [])
        }]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const created = response.results[0];
        if (!created.success) {
          console.error(`Failed to create workflow: ${JSON.stringify(created)}`);
          throw new Error(created.message || "Failed to create workflow");
        }
        
        const w = created.data;
        return {
          Id: w.Id,
          name: w.name_c || '',
          description: w.description_c || '',
          isActive: w.is_active_c || false,
          createdAt: w.created_at_c || null,
          lastModified: w.last_modified_c || null,
          lastRun: w.last_run_c || null,
          runCount: w.run_count_c || 0,
          nodes: w.nodes_c ? JSON.parse(w.nodes_c) : [],
          connections: w.connections_c ? JSON.parse(w.connections_c) : []
        };
      }
      
      throw new Error("No data returned from create operation");
    } catch (error) {
      console.info(`apper_info: Got this error in workflowService.create: ${error.message}`);
      throw error;
    }
  },

  update: async (id, updates) => {
    try {
      const updateData = {
        Id: parseInt(id),
        last_modified_c: new Date().toISOString()
      };
      
      if (updates.name !== undefined) updateData.name_c = updates.name;
      if (updates.description !== undefined) updateData.description_c = updates.description;
      if (updates.isActive !== undefined) updateData.is_active_c = updates.isActive;
      if (updates.lastRun !== undefined) updateData.last_run_c = updates.lastRun;
      if (updates.runCount !== undefined) updateData.run_count_c = updates.runCount;
      if (updates.nodes !== undefined) updateData.nodes_c = JSON.stringify(updates.nodes);
      if (updates.connections !== undefined) updateData.connections_c = JSON.stringify(updates.connections);

      const response = await apperClient.updateRecord('workflow_c', {
        records: [updateData]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const updated = response.results[0];
        if (!updated.success) {
          console.error(`Failed to update workflow: ${JSON.stringify(updated)}`);
          throw new Error(updated.message || "Failed to update workflow");
        }
        
        const w = updated.data;
        return {
          Id: w.Id,
          name: w.name_c || '',
          description: w.description_c || '',
          isActive: w.is_active_c || false,
          createdAt: w.created_at_c || null,
          lastModified: w.last_modified_c || null,
          lastRun: w.last_run_c || null,
          runCount: w.run_count_c || 0,
          nodes: w.nodes_c ? JSON.parse(w.nodes_c) : [],
          connections: w.connections_c ? JSON.parse(w.connections_c) : []
        };
      }
      
      throw new Error("No data returned from update operation");
    } catch (error) {
      console.info(`apper_info: Got this error in workflowService.update: ${error.message}`);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await apperClient.deleteRecord('workflow_c', {
        RecordIds: [parseInt(id)]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const deleted = response.results[0];
        if (!deleted.success) {
          console.error(`Failed to delete workflow: ${JSON.stringify(deleted)}`);
          throw new Error(deleted.message || "Failed to delete workflow");
        }
      }

      return { success: true };
    } catch (error) {
      console.info(`apper_info: Got this error in workflowService.delete: ${error.message}`);
      throw error;
    }
  },

  toggleActive: async (id) => {
    try {
      const current = await workflowService.getById(id);
      
      const response = await apperClient.updateRecord('workflow_c', {
        records: [{
          Id: parseInt(id),
          is_active_c: !current.isActive,
          last_modified_c: new Date().toISOString()
        }]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const updated = response.results[0];
        if (!updated.success) {
          console.error(`Failed to toggle workflow: ${JSON.stringify(updated)}`);
          throw new Error(updated.message || "Failed to toggle workflow");
        }
        
        const w = updated.data;
        return {
          Id: w.Id,
          name: w.name_c || '',
          description: w.description_c || '',
          isActive: w.is_active_c || false,
          createdAt: w.created_at_c || null,
          lastModified: w.last_modified_c || null,
          lastRun: w.last_run_c || null,
          runCount: w.run_count_c || 0,
          nodes: w.nodes_c ? JSON.parse(w.nodes_c) : [],
          connections: w.connections_c ? JSON.parse(w.connections_c) : []
        };
      }
      
      throw new Error("No data returned from toggle operation");
    } catch (error) {
      console.info(`apper_info: Got this error in workflowService.toggleActive: ${error.message}`);
      throw error;
    }
  }
};

export default workflowService;