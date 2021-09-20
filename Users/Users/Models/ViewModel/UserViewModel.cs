using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Users.Models.ViewModel
{
    public class UserViewModel
    {
        public User User { get; set; }
        public string Message { get; set; }
        public bool Result { get; internal set; }
        public string Toka { get; set; }

    }
}
