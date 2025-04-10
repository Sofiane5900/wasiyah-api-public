name: Bug Report
description: Report a bug found in the NestJS application
title: "[Bug] "
labels: ["bug"]
assignees: []

body:
  - type: textarea
    attributes:
      label: Bug description
      description: Clearly describe the unexpected behavior.
      placeholder: Example: When I try to create a user, I get a 500 error.
    validations:
      required: true

  - type: textarea
    attributes:
      label: Steps to reproduce
      description: Provide a clear and concise set of steps to reproduce the issue.
      placeholder: |
        1. Go to /register
        2. Fill in the form fields
        3. Click "Sign Up"
        4. Observe the error
    validations:
      required: true

  - type: input
    attributes:
      label: Environment
      description: Indicate the version of NestJS / Node / OS used
      placeholder: NestJS 10, Node 18, Ubuntu 22.04
    validations:
      required: false
