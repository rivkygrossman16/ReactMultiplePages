using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeopleCars.Data;
using ReactPeopleCars.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPeopleCars.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }


        [Route("getall")]
        [HttpGet]
        public List<Person> GetAll()
        {
            var repo = new PeopleCarRepository(_connectionString);
            return repo.GetAll();
        }


        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new PeopleCarRepository(_connectionString);
            repo.AddPerson(person);
        }
        [HttpGet]
        [Route("getbyid")]
        public Person GetById(int id)
        {
            var repo = new PeopleCarRepository(_connectionString);
            return repo.GetById(id);
        }

        [HttpGet]
        [Route("getcarsbyid")]
        public List<Car> GetCarsById(int id)
        {
            var repo = new PeopleCarRepository(_connectionString);
            return repo.GetCars(id);
        }

        [HttpPost]
        [Route("addcar")]
        public void AddCar(Car car)
        {
            var repo = new PeopleCarRepository(_connectionString);
            repo.AddCar(car);
        }

        [HttpPost]
        [Route("deletecars")]
        public void DeleteCars(DeleteViewModel vm)
        {
            var repo = new PeopleCarRepository(_connectionString);
            repo.DeleteCar(vm.Id);
        }

    }
 
    }
