        public Job GetJobById(int id)
        {
            string procName = "[dbo].[Jobs_Select_ById]";

            Job job = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                job = MapSingleJob(reader);
            });
            return job;
        }
