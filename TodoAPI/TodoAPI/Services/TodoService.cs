namespace TodoAPI.Services
{
    using TodoAPI.Data;
    using TodoAPI.Interface;
    using TodoAPI.Models;

    public class TodoService : ITodoService
    {
        private readonly ApplicationDbContext context;

        public TodoService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public List<Todo> GetTodos()
        {
            return this.context.Todos.ToList();
        }

        public Todo? GetById(int id)
        {
            return this.context.Todos.Find(id);
        }

        public void Add(Todo todo)
        {
            this.context.Todos.AddAsync(todo);
            this.context.SaveChanges();
        }

        public void Delete(Todo todo)
        {
            this.context.Remove(todo);
            this.context.SaveChanges();
        }

        public void Update(Todo todo)
        {
            this.context.Todos.Update(todo);
            this.context.SaveChanges();
        }
    }
}
