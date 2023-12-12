using Store.Server.Dto;
using Store.Server.Entities;

namespace Store.Server.Repositories.Contracts
{
    public interface IProductRepository
    {
        public Task<IEnumerable<Product?>> GetProducts();

        public Task<Product?> GetProductByIds(string? mainId, string? altId);

        public Task<IEnumerable<Product?>> GetProductsByName(string? productName);

        public Task<Product?> CreateProduct(ProductForCreateDto product);

        public Task<Product?> UpdateProduct(string? mainId, string? altId, ProductForUpdateDto product);

        public Task DeleteProduct(string? mainId, string? altId);
    }
}
