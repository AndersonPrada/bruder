document.addEventListener("DOMContentLoaded", () => {
  const connectionForm = document.getElementById("connectionForm");

  if (!connectionForm) {
    console.error(
      "Error: No se encontró el formulario con id 'connectionForm'"
    );
    return;
  }

  connectionForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("nombre").value;
    const cedula = document.getElementById("cedula").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    try {
      const response = await fetch("http://localhost:3000/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, cedula, email, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al procesar la solicitud");
        return;
      }

      window.location.href = data.redirect;
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error. Inténtalo nuevamente.");
    }
  });
});
