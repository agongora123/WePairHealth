        [HttpGet("{id:int}")]

        public ActionResult<ItemResponse<Job>> GetId(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Job aJob = _service.GetJobById(id);
                if (aJob == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<Job> { Item = aJob };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }

