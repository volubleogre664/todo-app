using TodoAPI.Models;

namespace TodoAPI.Interface
{
    public interface ITodoService
    {
        List<Todo> GetTodos();

        Todo? GetById(int id);

        void Delete(Todo todo);

        void Update(Todo todo);

        void Add(Todo todo);
    }
}
