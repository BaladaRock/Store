using Microsoft.Data.SqlClient;
using System.Data;

namespace Store.Server.Context
{
    public class ProductContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public ProductContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("SqlConnection")!;
        }

        public IDbConnection CreateConnection() => new SqlConnection(_connectionString);
    }
}
