using Dapper;
using Store.Server.Context;
using Store.Server.Dto;
using Store.Server.Entities;
using Store.Server.Repositories.Contracts;
using System.Data;

namespace Store.Server.Repositories.Repository
{
    public class ProductRepository(ProductContext context) : IProductRepository
    {
        private readonly ProductContext _context = context;

        public async Task<Product?> GetProductByIds(string? mainId, string? altId)
        {
            var queryCodIdx = "SELECT CodIdx AS IdxCode, CodIdxAlt AS IdxCodeAlt, Denumire AS Name," +
                " DataInregistrare AS Date, Cantitate AS Quantity, PretUnitar AS Price FROM Produse" +
                " WHERE CodIdx = @mainId AND CodIdxAlt = @altId";

            using var connection = _context.CreateConnection();

            return await connection.QuerySingleOrDefaultAsync<Product>(queryCodIdx, new { mainId, altId });
        }

        public async Task<IEnumerable<Product?>> GetProductsByName(string? productName)
        {
            var queryName = "SELECT CodIdx AS IdxCode, CodIdxAlt AS IdxCodeAlt, Denumire AS Name," +
                " DataInregistrare AS Date, Cantitate AS Quantity, PretUnitar AS Price FROM Produse" +
                " WHERE Denumire = @productName";

            using var connection = _context.CreateConnection();
            return await connection.QueryAsync<Product>(queryName, new { productName });
        }

        public async Task<IEnumerable<Product?>> GetProducts()
        {
            var queryProducts = "SELECT CodIdx AS IdxCode, CodIdxAlt AS IdxCodeAlt, Denumire AS Name," +
                " DataInregistrare AS Date, Cantitate AS Quantity, PretUnitar AS Price FROM Produse";

            using var connection = _context.CreateConnection();
            return await connection.QueryAsync<Product>(queryProducts);
        }

        public async Task<Product?> CreateProduct(ProductForCreateDto newProduct)
        {
            var queryInsert = "INSERT INTO Produse (CodIdx, CodIdxAlt, Denumire," +
                " DataInregistrare, Cantitate, PretUnitar)" +
                " VALUES (@IdxCode, @IdxCodeAlt, @Name, @Date, @Quantity, @Price);" +
                " SELECT CAST(SCOPE_IDENTITY() as NVARCHAR)";
            var registrationDate = DateTime.Now;

            var parameters = new DynamicParameters();
            parameters.Add("IdxCode", newProduct.IdxCode, DbType.String);
            parameters.Add("IdxCodeAlt", newProduct.IdxCodeAlt, DbType.String);
            parameters.Add("Name", newProduct.Name, DbType.String);
            parameters.Add("Date", registrationDate, DbType.DateTime);
            parameters.Add("Quantity", newProduct.Quantity, DbType.Decimal);
            parameters.Add("Price", newProduct.Price, DbType.Decimal);

            using var connection = _context.CreateConnection();
            var id = await connection.QuerySingleAsync<string?>(queryInsert, parameters);
            var createdCompany = new Product
            {
                IdxCode = newProduct.IdxCode,
                IdxCodeAlt = newProduct.IdxCodeAlt,
                Name = newProduct.Name,
                Date = registrationDate,
                Quantity = newProduct.Quantity,
                Price = newProduct.Price
            };

            return createdCompany;
        }

        public async Task<Product?> UpdateProduct(string? mainId, string? altId, ProductForUpdateDto product)
        {
            var queryUpdate = "UPDATE Produse SET Denumire = @Name,  DataInregistrare= @Date," +
                " Cantitate = @Quantity, PretUnitar = @Price" +
                " WHERE CodIdx = @MainId AND CodIdxAlt = @AltId";

            var parameters = new DynamicParameters();
            parameters.Add("MainId", mainId, DbType.String);
            parameters.Add("AltId", altId, DbType.String);
            parameters.Add("Name", product.Name, DbType.String);
            parameters.Add("Date", product.Date, DbType.DateTime);
            parameters.Add("Quantity", product.Quantity, DbType.Decimal);
            parameters.Add("Price", product.Price, DbType.Decimal);

            using var connection = _context.CreateConnection();
            await connection.ExecuteAsync(queryUpdate, parameters);

            return await GetProductByIds(mainId, altId);
        }

        public async Task DeleteProduct(string? mainId, string? altId)
        {
            var deleteQuery = "DELETE FROM Produse WHERE CodIdx = @mainId AND CodIdxAlt = @altId";
            
            using var connection = _context.CreateConnection();
            await connection.ExecuteAsync(deleteQuery, new { mainId, altId });
        }
    }
}
