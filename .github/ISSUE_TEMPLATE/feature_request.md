name: ✨ Feature Request
description: Suggest a new feature or enhancement
title: "[Feature] "
labels: ["enhancement"]
assignees: []

body:

- type: textarea
  attributes:
  label: Feature description
  description: Describe the new feature or enhancement you'd like to see.
  placeholder: I'd like to have email confirmation after registration.
  validations:
  required: true

- type: textarea
  attributes:
  label: Why is this feature useful?
  description: Explain how this feature improves the user experience or project.
  placeholder: It would allow users to verify their email before accessing the app.
  validations:
  required: false

- type: textarea
  attributes:
  label: Alternatives considered
  description: Have you considered other ways to achieve this?
  placeholder: I thought about using a third-party mail service like Mailgun.
  validations:
  required: false
