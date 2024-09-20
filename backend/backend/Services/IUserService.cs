using backend.Templates;

namespace backend.Services
{
	public interface IUserService
	{
        Task<int> InsertAsync(UserTemplate insertUser);
        Task<GetUserTemplate?> GetAsync(int id);
        Task DeleteAsync(int id);
    }
}
