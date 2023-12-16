namespace Store.Server.Entities
{
    public class Product
    {
        public string? Name { get; set; }

        public string? IdxCode { get; set; }

        public string? IdxCodeAlt { get; set; }

        public DateTime? Date { get; set; } = default;

        public int Quantity { get; set; }

        public int Price { get; set; }
    }
}
