using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace AspNet46TestApp.Services
{
    public class CustomerDataService
    {
        public async Task<IEnumerable<Customer>> GetAllCustomersAsync()
        {
            var client = new HttpClient();

            var response = await client.GetStringAsync("http://ui-grid.info/data/10000_complex.json");
            return JsonConvert.DeserializeObject<List<Customer>>(response);
        }
    }

    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public Address Address { get; set; }
    }

    public class Address
    {
        public string State { get; set; }
        public string City { get; set; }
    }
}
