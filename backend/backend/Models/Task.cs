using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace backend.Models
{
    public class Task
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PublishedOn { get; set; }
        public bool Completed { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
