const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const executionLogService = {
  getAll: async () => {
    try {
      const response = await apperClient.fetchRecords('execution_log_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "workflow_id_c"}},
          {"field": {"Name": "workflow_name_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "error_c"}},
          {"field": {"Name": "trigger_data_c"}},
          {"field": {"Name": "step_results_c"}}
        ],
        orderBy: [{"fieldName": "timestamp_c", "sorttype": "DESC"}]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return (response.data || []).map(l => ({
        Id: l.Id,
        workflowId: l.workflow_id_c || 0,
        workflowName: l.workflow_name_c || '',
        timestamp: l.timestamp_c || null,
        status: l.status_c || '',
        duration: l.duration_c || 0,
        error: l.error_c || null,
        triggerData: l.trigger_data_c ? JSON.parse(l.trigger_data_c) : null,
        stepResults: l.step_results_c ? JSON.parse(l.step_results_c) : []
      }));
    } catch (error) {
      console.info(`apper_info: Got this error in executionLogService.getAll: ${error.message}`);
      throw error;
    }
  },

  getByWorkflowId: async (workflowId) => {
    try {
      const response = await apperClient.fetchRecords('execution_log_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "workflow_id_c"}},
          {"field": {"Name": "workflow_name_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "error_c"}},
          {"field": {"Name": "trigger_data_c"}},
          {"field": {"Name": "step_results_c"}}
        ],
        where: [{"FieldName": "workflow_id_c", "Operator": "EqualTo", "Values": [parseInt(workflowId)]}],
        orderBy: [{"fieldName": "timestamp_c", "sorttype": "DESC"}]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return (response.data || []).map(l => ({
        Id: l.Id,
        workflowId: l.workflow_id_c || 0,
        workflowName: l.workflow_name_c || '',
        timestamp: l.timestamp_c || null,
        status: l.status_c || '',
        duration: l.duration_c || 0,
        error: l.error_c || null,
        triggerData: l.trigger_data_c ? JSON.parse(l.trigger_data_c) : null,
        stepResults: l.step_results_c ? JSON.parse(l.step_results_c) : []
      }));
    } catch (error) {
      console.info(`apper_info: Got this error in executionLogService.getByWorkflowId: ${error.message}`);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await apperClient.getRecordById('execution_log_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "workflow_id_c"}},
          {"field": {"Name": "workflow_name_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "error_c"}},
          {"field": {"Name": "trigger_data_c"}},
          {"field": {"Name": "step_results_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Execution log not found");
      }

      const l = response.data;
      return {
        Id: l.Id,
        workflowId: l.workflow_id_c || 0,
        workflowName: l.workflow_name_c || '',
        timestamp: l.timestamp_c || null,
        status: l.status_c || '',
        duration: l.duration_c || 0,
        error: l.error_c || null,
        triggerData: l.trigger_data_c ? JSON.parse(l.trigger_data_c) : null,
        stepResults: l.step_results_c ? JSON.parse(l.step_results_c) : []
      };
    } catch (error) {
      console.info(`apper_info: Got this error in executionLogService.getById: ${error.message}`);
      throw error;
    }
  },

  getRecent: async (limit = 20) => {
    try {
      const response = await apperClient.fetchRecords('execution_log_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "workflow_id_c"}},
          {"field": {"Name": "workflow_name_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "error_c"}},
          {"field": {"Name": "trigger_data_c"}},
          {"field": {"Name": "step_results_c"}}
        ],
        orderBy: [{"fieldName": "timestamp_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": limit, "offset": 0}
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return (response.data || []).map(l => ({
        Id: l.Id,
        workflowId: l.workflow_id_c || 0,
        workflowName: l.workflow_name_c || '',
        timestamp: l.timestamp_c || null,
        status: l.status_c || '',
        duration: l.duration_c || 0,
        error: l.error_c || null,
        triggerData: l.trigger_data_c ? JSON.parse(l.trigger_data_c) : null,
        stepResults: l.step_results_c ? JSON.parse(l.step_results_c) : []
      }));
    } catch (error) {
      console.info(`apper_info: Got this error in executionLogService.getRecent: ${error.message}`);
      throw error;
    }
  }
};

export default executionLogService;