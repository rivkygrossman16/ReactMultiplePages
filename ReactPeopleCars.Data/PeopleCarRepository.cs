using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleCars.Data
{
   public class PeopleCarRepository
    {
        private readonly string _connectionString;

        public PeopleCarRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleCarsContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList();
        }
        public void AddPerson(Person person)
        {
            using var context = new PeopleCarsContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void AddCar(Car car)
        {
            using var context = new PeopleCarsContext(_connectionString);
            context.Cars.Add(car);
            context.SaveChanges();
        }
        public Person GetById(int id)
        {
            using var context = new PeopleCarsContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }
        public void DeleteCar(int id)
        {
            using var context = new PeopleCarsContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Cars WHERE personId = {id}");
        }

        public List<Car> GetCars(int id)
        {
            using var context = new PeopleCarsContext(_connectionString);
            return context.Cars.Where(c => c.PersonId == id).ToList();
        }
    }
}
