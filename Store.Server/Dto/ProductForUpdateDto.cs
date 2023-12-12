namespace Store.Server.Dto
{
    public class ProductForUpdateDto
    {
        public string? Name { get; set; }

        public int Price { get; set; }

        public int Quantity { get; set; }

        public DateTime? Date { get; set; } = default;
    }
}
