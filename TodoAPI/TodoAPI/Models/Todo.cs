namespace TodoAPI.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Todo
    {
        [Key]
        public int TodoId { get; set; }

        [Required]
        [StringLength(100)]
        public string Text { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public bool IsCompleted { get; set; }
    }
}
