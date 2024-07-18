<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Contact</title>
    <style>
        .success { color: green; }
        .error { color: red; }
    </style>
</head>
<body>
    <h1>Contact</h1>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <label>Votre email</label>
        <input type="email" name="email" required><br>
        <label>Message</label>
        <textarea name="message" required></textarea><br>
        <input type="submit">
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Validate email
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo '<p class="error">Adresse email invalide.</p>';
            exit;
        }

        // Sanitize message
        $message = htmlspecialchars(trim($_POST["message"]));
        if (empty($message)) {
            echo '<p class="error">Message ne peut pas être vide.</p>';
            exit;
        }

        // Set email parameters
        $to = 'destinataire@free.fr';
        $subject = 'Envoi depuis la page Contact';
        $headers = "From: jon.sumera@gmail.com\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Send email
        if (mail($to, $subject, $message, $headers)) {
            echo '<p class="success">Votre message a bien été envoyé.</p>';
        } else {
            echo '<p class="error">Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.</p>';
        }
    }
    ?>
</body>
</html>