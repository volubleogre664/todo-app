namespace TodoAPI.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    
    using TodoAPI.Interface;
    using TodoAPI.Models;

    [ApiController]
    [Route("api/[controller]")]
    public class TodoController: ControllerBase
    {
        private readonly ITodoService todoService;

        public TodoController(ITodoService todoService)
        {
            this.todoService = todoService;
        }

        [HttpGet]
        public IActionResult GetTodos()
        {
            return this.Ok(this.todoService.GetTodos());
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var todo = this.todoService.GetById(id);

            if (todo == null)
            {
                return this.BadRequest(new { message = "No todo with the given id", todoId = id});
            }

            this.todoService.Delete(todo!);

            return this.Ok(true);
        }

        [HttpPost]
        public IActionResult Create(Todo todo)
        {
            if (todo == null)
            {
                return BadRequest(new { message = "Cannot create empty todo" });
            }

            this.todoService.Add(todo);
            return this.Ok(todo);
        }

        [HttpPut]
        public IActionResult Update(Todo todo)
        {
            if (todo == null || todo.TodoId == 0)
            {
                return this.BadRequest(new { message = "Invalid update" });
            }

            this.todoService.Update(todo);
            return this.Ok(todo);
        }
    }
}
