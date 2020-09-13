function cartCheckout(event) {
  event.preventDefault();
  const name = document.getElementById("firstName").value;
  const feature =
    "width=750,height=1500,menubar=no,toolbar=no,location=no,status=no";
  const newWindow = window.open("", "Your Order", feature);
  const content = document.getElementById("checkout-table").innerHTML;
  var userInfo = "";
  document
    .querySelectorAll(
      "#checkout-bill input, #checkout-bill select, #checkout-bill textarea"
    )
    .forEach((input) => {
      if (
        input.value &&
        input.value !== "on" &&
        input.name !== "paymentMethod"
      ) {
        const name = document.querySelector(`label[for=${input.id}]`).innerText;
        userInfo += `
      <div class="form-group">
        <label for="${input.id}">${name}</label>
        <p id=${input.id}>${input.value}</p>
      </div>`;
      }
    });
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
      <div id="userInfo">${userInfo}</div>
      <script>
        const row = document.querySelector("#content .row");
        document.querySelectorAll("input, select, textarea").forEach((input) => {
          const p = document.createElement("p");
          p.innerText = input.value;
          input.after(p);
          input.remove();
        });
        setTimeout(window.print, 500);
      </script>
    </body>
  </html>`);
  if (window.Notification && Notification.permission !== "denied") {
    new Notification(`Thanks ${name}, for ordering juice with us!`, {
      body:
        "Print your order now and keep this order note for future reference!",
      tag: "T&CJuice",
    });
  } else {
    alert(
      "Print your order now and keep this order note for future reference!"
    );
  }
}
