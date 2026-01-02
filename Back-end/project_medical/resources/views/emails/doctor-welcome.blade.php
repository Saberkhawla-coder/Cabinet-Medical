<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome Doctor</title>
</head>
<body>
    <h1>Welcome Dr {{ $doctor->user->name }}</h1>

    <p>Your account has been created successfully.</p>

    <p>
        <strong>Email:</strong> {{ $doctor->user->email }}
    </p>

    <p>
        <strong>Temporary Password:</strong> {{ $tempPassword }}
    </p>

    <p>
        Please change your password after logging in.
    </p>

    <p>Best regards,<br>{{ config('app.name') }}</p>
</body>
</html>
