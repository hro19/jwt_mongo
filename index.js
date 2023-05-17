const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!wider!!");
});

//全情報を取得
app.get("/api/customers", (req, res) => {
  res.send(customers);
});

const customers = [
  { title: "田中", id: 1 },
  { title: "齋藤", id: 2 },
  { title: "橋本", id: 3 },
  { title: "鈴木", id: 4 },
  { title: "山本", id: 5 },
];

//情報の新規登録
app.post("/api/customers", (req, res) => {
    const customer = {
        title: req.body.title,
        id: customers.length + 1,
    };
    customers.push(customer);
    res.send(customer);
});

//情報の更新
app.put("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    customer.title = req.body.title;
    
  res.send(customer);
});

//情報の削除
app.delete("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    const index = customers.indexOf(customer);
    customers.splice(index, 1);

  res.send(customer);
});


app.listen(port, () => {
  console.log(`サーバー起動 port ${port}`);
});
