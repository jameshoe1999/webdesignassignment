function cartCheckout(event) {
  console.log("prevented");
  event.preventDefault();
  const name = document.getElementById("firstName").value
  const feature = "width=750,height=1500,menubar=no,toolbar=no,location=no,status=no"
  const newWindow = window.open("", "Your Order", feature);
  const content = document.getElementById("checkout-cart").innerHTML;
  newWindow.document.write(`
  <html>
    <head>
      <link rel="stylesheet" href="assets/css/bootstrap-4.1.3.min.css" />
      <link rel="stylesheet" href="assets/css/style.css" />
      <style>
        table tbody td:last-child, table thead th:last-child, table tfoot th:last-child {
          display: none;
        }
        button {
          display: none !important;
        }
        #redeemCode {
          display: none;
        }
      </style>
    </head>
    <body>
      <div id="content">${content}</div>
      <script>
        const row = document.querySelector("#content .row");
        row.classList = "container";
        row.firstElementChild.classList = "";
        row.firstElementChild.nextElementSibling.classList = "";
        window.print();
      </script>
    </body>
  </html>`);
  if (window.Notification && Notification.permission !== "denied") {
    new Notification(`Thanks ${name}, for ordering juice with us!`, {
      body: "Print your order now and keep this order note for future reference!",
      tag: "T&CJuice"
    });
  } else {
    alert("Print your order now and keep this order note for future reference!");
  }
}