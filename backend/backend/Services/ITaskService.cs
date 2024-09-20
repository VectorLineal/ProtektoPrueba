using backend.Templates;

namespace backend.Services
{
    public interface ITaskService
    {
        Task<int> InsertAsync(InsertTaskTemplate insertTask);
        Task<GetTaskTemplate?> GetAsync(int id);
        Task<List<GetTaskTemplate>> GetAllFromUserAsync(int userId);
        Task UpdateAsync(int id, UpdateTaskTemplate updateTask);
        Task DeleteAsync(int id);
    }
}
