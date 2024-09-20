using backend.Data;
using backend.Models;
using backend.Templates;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext appDbContext;
        public TaskService(AppDbContext dbContext)
        {
            appDbContext = dbContext;
        }

        public async Task<int> InsertAsync(InsertTaskTemplate insertTask)
        {
            var task = new Models.Task
            {
                Title = insertTask.Title,
                Content = insertTask.Content,
                UserId = insertTask.UserId
            };
            await appDbContext.Tasks.AddAsync(task);
            await appDbContext.SaveChangesAsync();

            return task.Id;
        }

        public async System.Threading.Tasks.Task UpdateAsync(int id, UpdateTaskTemplate updateTask)
        {
            var task = await appDbContext.Tasks.SingleAsync(x => x.Id == id);
            task.Title = updateTask.Title;
            task.Content = updateTask.Content;
            task.Completed = updateTask.Completed;

            await appDbContext.SaveChangesAsync();
        }

        public async System.Threading.Tasks.Task DeleteAsync(int id)
        {
            var task = await appDbContext.Tasks.SingleAsync(x => x.Id == id);
            appDbContext.Remove(task);

            await appDbContext.SaveChangesAsync();
        }

        public async Task<GetTaskTemplate?> GetAsync(int id)
        {
            var task = await appDbContext.Tasks.FirstOrDefaultAsync(x => x.Id == id);
            if (task == null) return null;
            else return new GetTaskTemplate
            {
                Id = task.Id,
                Title = task.Title,
                Content = task.Content,
                Completed = task.Completed,
                PublishedOn = task.PublishedOn
            };
        }

        public Task<List<GetTaskTemplate>> GetAllFromUserAsync(int userId)
        {
            return appDbContext.Tasks.Where(x => x.UserId == userId).Select(task => new GetTaskTemplate
            {
                Id = task.Id,
                Title = task.Title,
                Content = task.Content,
                Completed = task.Completed,
                PublishedOn = task.PublishedOn
            }).ToListAsync();
        }
    }
}
