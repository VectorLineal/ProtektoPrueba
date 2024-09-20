using backend.Models;

namespace backend.Templates
{
    public class UpdateTaskTemplate
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public bool Completed { get; set; }
    }
}
