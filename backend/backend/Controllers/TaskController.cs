using backend.Services;
using backend.Templates;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }
        [HttpPost]
        public async Task<IActionResult> InsertAsync(InsertTaskTemplate insertTask)
        {
            var id = await _taskService.InsertAsync(insertTask);
            return Created(string.Empty, new { id });
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var task = await _taskService.GetAsync(id);
            if (task == null) return NotFound();
            return Ok(task);
        }
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetAllFromUserAsync(int userId)
        {
            var tasks = await _taskService.GetAllFromUserAsync(userId);
            return Ok(tasks);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateTaskTemplate updateTask)
        {
            await _taskService.UpdateAsync(id, updateTask);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            await _taskService.DeleteAsync(id);
            return NoContent();
        }
    }
}
