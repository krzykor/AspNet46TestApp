using System;
using Microsoft.AspNet.Mvc;
using AspNet46TestApp.Services;
using System.Threading.Tasks;
using System.Linq;
using System.Linq.Dynamic;
// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AspNet46TestApp.Controllers
{
    public class CustomersController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        public async Task<JsonResult> GetCustomers(string query, bool validateOnly)
        {
            if (validateOnly)
            {
                var emptyQueryable = new EnumerableQuery<Customer>(new Customer[0]);
                try
                {
                    emptyQueryable.Where(query);
                    return Json(new { Valid = true });
                }
                catch (ParseException ex)
                {
                    return Json(new { Valid = false, ex.Message });
                }
            }

            var service = new CustomerDataService();
            var result = await service.GetAllCustomersAsync();
            IQueryable<Customer> queryableResult = result.AsQueryable();
            if (!string.IsNullOrWhiteSpace(query))
            {
                queryableResult = queryableResult.Where(query);
            }

            return Json(queryableResult.ToArray());
        }
    }
}
