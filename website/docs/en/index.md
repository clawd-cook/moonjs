---
description: MoonJS is a pure-MoonBit JavaScript engine — landing page with quick-start, architecture, and milestone highlights.
pageType: home

hero:
  name: MoonJS
  text: JavaScript on MoonBit
  tagline: A pure-MoonBit JavaScript engine targeting the QuickJS test corpus and TC39 test262.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/start/introduction
    - theme: alt
      text: GitHub
      link: https://github.com/clawd-cook/moonjs
  image:
    src: /rspress-icon.png
    alt: MoonJS
features:
  - title: Pure MoonBit
    details: No C FFI. Compiles on native / wasm-gc / js targets. Uses only moonbitlang/core.
    icon: 🌙
    link: /guide/architecture/overview
  - title: Bytecode VM
    details: 32-bit fixed-length instructions, Shape-based objects, Lua-style upvalue capture. Reference opcode set aligned with QuickJS.
    icon: ⚙️
    link: /guide/architecture/bytecode
  - title: ES2023+ syntax
    details: Full lexer and parser covering the complete ES2023+ grammar. M1 compiler runs a control-flow + closures subset today.
    icon: 📝
    link: /guide/architecture/pipeline
  - title: QuickJS parity as spec
    details: quickjs/tests/*.js and TC39 test262 (pinned commit) are the ground truth. M1 already passes 13/13 acceptance criteria.
    icon: 🎯
    link: /guide/milestones/overview
  - title: Precise error locations
    details: Every AST node carries a SourceSpan; every bytecode instruction has a parallel SourceLoc. Exceptions render `line:col` stack traces.
    icon: 📍
    link: /guide/architecture/pipeline
  - title: Milestone-driven
    details: Six milestones (M1 core VM → M6 test262 sprint) planned in the open. M1 done, M2 next.
    icon: 🗺️
    link: /guide/milestones/overview
---
