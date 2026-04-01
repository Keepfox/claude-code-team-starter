from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"

TITLE_FONT = "/System/Library/Fonts/Supplemental/Trebuchet MS.ttf"
BODY_FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
MONO_FONT = "/System/Library/Fonts/Supplemental/Menlo.ttc"

CREAM = "#F3EBDD"
SAND = "#F9F5EC"
PAPER = "#FCF9F1"
DARK = "#111317"
DARKER = "#15181E"
TERMINAL = "#171A20"
STROKE = "#2E3440"
WHITE = "#F8FAFC"
MUTED = "#C2C8D3"
SOFT = "#AAB3C2"
GREEN = "#5CD6A5"
ORANGE = "#FF8360"
YELLOW = "#FFCF5A"
ROSE = "#7D3652"
TEAL = "#185D76"
SEA = "#2C6A57"
BROWN = "#7E5F2E"
BLUE = "#8BC0FF"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def card(draw: ImageDraw.ImageDraw, box, fill, radius=24, outline=None, width=2) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def traffic_lights(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    for index, color in enumerate([ORANGE, YELLOW, GREEN]):
        offset = x + index * 26
        draw.ellipse((offset, y, offset + 16, y + 16), fill=color)


def terminal_window(img: Image.Image, title: str, subtitle: str, lines, accent: str) -> None:
    draw = ImageDraw.Draw(img)

    card(draw, (28, 28, img.width - 28, img.height - 28), PAPER, 30)
    draw.text((84, 82), title, fill=DARK, font=font(TITLE_FONT, 44))
    draw.text((86, 136), subtitle, fill="#5F6978", font=font(BODY_FONT, 24))

    card(draw, (84, 220, img.width - 84, img.height - 108), TERMINAL, 28, STROKE, 2)
    traffic_lights(draw, 114, 254)
    draw.text((208, 248), "terminal demo", fill=SOFT, font=font(MONO_FONT, 20))

    y = 330
    for text, color, size in lines:
        draw.text((122, y), text, fill=color, font=font(MONO_FONT, size))
        y += 54 if size >= 24 else 38

    card(draw, (86, img.height - 82, 430, img.height - 42), accent, 20)
    draw.text((112, img.height - 72), "claude-code-team-starter", fill=DARK, font=font(TITLE_FONT, 22))


def render_social_preview() -> None:
    img = Image.new("RGB", (1280, 640), CREAM)
    draw = ImageDraw.Draw(img)

    card(draw, (32, 32, 1248, 608), SAND, 32)
    card(draw, (64, 64, 1216, 576), DARK, 28, "#E7DCCB", 2)
    card(draw, (98, 112, 584, 484), TERMINAL, 24, STROKE, 2)

    traffic_lights(draw, 128, 142)
    draw.text((220, 138), "claude-code-team-starter", fill=SOFT, font=font(MONO_FONT, 18))

    lines = [
        ("$ node scripts/install.mjs ./repo --variant frontend", GREEN, 20),
        ("copied .claude/settings.json", WHITE, 18),
        ("copied .claude/commands/review.md", WHITE, 18),
        ("copied .claude/agents/security-reviewer.md", WHITE, 18),
        ("copied .mcp.json", WHITE, 18),
        ("validate: ok", "#8D96A6", 18),
    ]
    y = 200
    for text, color, size in lines:
        draw.text((132, y), text, fill=color, font=font(MONO_FONT, size))
        y += 44 if size == 20 else 34

    pill_specs = [
        ("Shared commands", "/review /ship /incident", BROWN, 878),
        ("Project subagents", "reviewer debugger security", ROSE, 812),
        ("Safer defaults", "hooks permissions secrets", SEA, 840),
        ("MCP-ready", "GitHub Postgres docs tools", TEAL, 806),
    ]
    y = 120
    for title, value, accent, text_x in pill_specs:
        card(draw, (620, y, 1150, y + 72), CREAM, 22)
        draw.text((650, y + 18), title, fill=DARK, font=font(TITLE_FONT, 24))
        draw.text((text_x, y + 19), value, fill=accent, font=font(MONO_FONT, 19))
        y += 92

    x = 620
    for label, fill, width in [("Starter", ORANGE, 160), ("MCP", YELLOW, 148), ("Subagents", GREEN, 190)]:
        card(draw, (x, 462, x + width, 510), fill, 24)
        draw.text((x + 30, 474), label, fill=DARK, font=font(TITLE_FONT, 22))
        x += width + 16

    draw.text((622, 506), "Claude Code Team Starter", fill=SAND, font=font(TITLE_FONT, 44))
    draw.text(
        (624, 548),
        "Starter template for team workflows, hooks, MCP, and subagents",
        fill=MUTED,
        font=font(BODY_FONT, 18),
    )

    img.save(ASSETS / "social-preview.png")


def render_readme_preview() -> None:
    img = Image.new("RGB", (1600, 900), "#F5EFE3")
    draw = ImageDraw.Draw(img)

    card(draw, (32, 32, 1568, 868), PAPER, 28)
    card(draw, (62, 62, 1538, 838), DARKER, 26, "#E8DECF", 2)
    card(draw, (104, 102, 1496, 188), "#0F1217", 20)

    traffic_lights(draw, 119, 136)
    draw.text((240, 124), "Claude Code Team Starter", fill=WHITE, font=font(TITLE_FONT, 36))
    draw.text((935, 130), "shared commands   subagents   hooks   MCP", fill="#BFC8D6", font=font(BODY_FONT, 24))

    card(draw, (104, 220, 726, 780), "#11151B", 24, "#2B3442", 2)
    draw.text((140, 256), "terminal", fill=SOFT, font=font(MONO_FONT, 24))

    left_lines = [
        ("$ npm run list-variants", GREEN),
        ("backend", WHITE),
        ("consulting", WHITE),
        ("data", WHITE),
        ("frontend", WHITE),
        ("support-triage", WHITE),
        ("$ claude", GREEN),
        ("/review-security auth flow", BLUE),
        ("/ship v0.1.0", BLUE),
        ("/incident flaky deploy", BLUE),
    ]
    y = 320
    for text, color in left_lines:
        draw.text((140, y), text, fill=color, font=font(MONO_FONT, 24))
        y += 50 if text.startswith("$") else 36

    card(draw, (756, 220, 1100, 470), "#F7F0E4", 24)
    draw.text((788, 274), "Included commands", fill=DARK, font=font(TITLE_FONT, 32))
    for index, line in enumerate(["/spec", "/review", "/review-security", "/pr-ready"]):
        draw.text((788, 332 + index * 38), line, fill=BROWN, font=font(MONO_FONT, 24))

    card(draw, (1122, 220, 1496, 470), "#F7F0E4", 24)
    draw.text((1154, 274), "Included agents", fill=DARK, font=font(TITLE_FONT, 32))
    for index, line in enumerate(["code-reviewer", "debugger", "security-reviewer", "release-manager"]):
        draw.text((1154, 332 + index * 38), line, fill=ROSE, font=font(MONO_FONT, 24))

    card(draw, (756, 500, 1496, 780), "#F7F0E4", 24)
    draw.text((788, 558), "Starter structure", fill=DARK, font=font(TITLE_FONT, 34))
    for index, line in enumerate([".claude/settings.json", ".claude/commands/", ".claude/agents/", ".claude/hooks/"]):
        draw.text((788, 620 + index * 36), line, fill=TEAL, font=font(MONO_FONT, 24))
    for index, line in enumerate([".mcp.json", "CLAUDE.md", "variants/", "mcp/examples/"]):
        draw.text((1130, 620 + index * 36), line, fill=SEA, font=font(MONO_FONT, 24))

    x = 108
    for label, fill, width in [("team starter", ORANGE, 180), ("mcp", YELLOW, 116), ("subagents", GREEN, 168)]:
        card(draw, (x, 808, x + width, 848), fill, 20)
        draw.text((x + 24, 818), label, fill=DARK, font=font(TITLE_FONT, 22))
        x += width + 16

    img.save(ASSETS / "readme-preview.png")


def render_workflow_overview() -> None:
    img = Image.new("RGB", (1600, 900), CREAM)
    draw = ImageDraw.Draw(img)

    card(draw, (32, 32, 1568, 868), PAPER, 30)
    draw.text((90, 92), "How Teams Use The Starter", fill=DARK, font=font(TITLE_FONT, 46))
    draw.text(
        (92, 146),
        "A simple path from install to shared workflows, safer defaults, and MCP-enabled delivery.",
        fill="#5F6978",
        font=font(BODY_FONT, 24),
    )

    columns = [
        ("1. Install", ["copy .claude", "copy CLAUDE.md", "choose variants"], ORANGE),
        ("2. Share", ["project commands", "subagents", "repo memory"], YELLOW),
        ("3. Guard", ["hooks", "permissions", "secret protection"], GREEN),
        ("4. Connect", ["GitHub", "Postgres", "docs", "internal tools"], "#8BC0FF"),
    ]

    start_x = 88
    width = 334
    gap = 26
    for index, (title, bullets, accent) in enumerate(columns):
        x1 = start_x + index * (width + gap)
        x2 = x1 + width
        card(draw, (x1, 240, x2, 690), DARK, 26, "#E8DECF", 2)
        card(draw, (x1 + 28, 268, x1 + 182, 316), accent, 22)
        draw.text((x1 + 48, 281), title, fill=DARK, font=font(TITLE_FONT, 24))
        y = 360
        for bullet in bullets:
            draw.rounded_rectangle((x1 + 36, y + 8, x1 + 52, y + 24), radius=8, fill=accent)
            draw.text((x1 + 68, y), bullet, fill=WHITE, font=font(BODY_FONT, 28))
            y += 74
        if index < len(columns) - 1:
            arrow_x = x2 + 10
            draw.line((arrow_x, 452, arrow_x + 26, 452), fill="#8F99AA", width=6)
            draw.polygon([(arrow_x + 26, 452), (arrow_x + 10, 440), (arrow_x + 10, 464)], fill="#8F99AA")

    card(draw, (92, 736, 1508, 820), SAND, 24)
    draw.text((124, 763), "Outcome: one team setup, less prompt drift, faster onboarding, and repeatable Claude Code workflows.", fill=DARK, font=font(BODY_FONT, 30))

    img.save(ASSETS / "workflow-overview.png")


def render_variant_composition() -> None:
    img = Image.new("RGB", (1600, 900), "#F5EFE3")
    draw = ImageDraw.Draw(img)

    card(draw, (32, 32, 1568, 868), PAPER, 30)
    draw.text((90, 92), "Compose Variants For Real Teams", fill=DARK, font=font(TITLE_FONT, 46))
    draw.text(
        (92, 146),
        "Base starter first. Then apply one or more overlays in order. Later variants win on the same file path.",
        fill="#5F6978",
        font=font(BODY_FONT, 24),
    )

    card(draw, (92, 228, 460, 720), DARKER, 28, "#E8DECF", 2)
    draw.text((126, 274), "Base starter", fill=WHITE, font=font(TITLE_FONT, 36))
    for index, line in enumerate(["settings", "commands", "agents", "hooks", "mcp", "CLAUDE.md"]):
        draw.text((132, 342 + index * 54), line, fill=SOFT, font=font(MONO_FONT, 28))

    card(draw, (516, 228, 824, 446), SAND, 26)
    draw.text((548, 272), "frontend", fill=DARK, font=font(TITLE_FONT, 34))
    draw.text((548, 330), "/check-ui", fill=TEAL, font=font(MONO_FONT, 28))
    draw.text((548, 372), "UI checks, a11y, states", fill="#5F6978", font=font(BODY_FONT, 24))

    card(draw, (858, 228, 1166, 446), SAND, 26)
    draw.text((890, 272), "consulting", fill=DARK, font=font(TITLE_FONT, 34))
    draw.text((890, 330), "/client-update", fill=ROSE, font=font(MONO_FONT, 28))
    draw.text((890, 372), "handoff and delivery notes", fill="#5F6978", font=font(BODY_FONT, 24))

    card(draw, (1200, 228, 1508, 446), SAND, 26)
    draw.text((1232, 272), "support-triage", fill=DARK, font=font(TITLE_FONT, 34))
    draw.text((1232, 330), "/triage-ticket", fill=SEA, font=font(MONO_FONT, 28))
    draw.text((1232, 372), "investigation workflows", fill="#5F6978", font=font(BODY_FONT, 24))

    card(draw, (516, 498, 1508, 720), DARK, 28, "#E8DECF", 2)
    draw.text((552, 544), "Install examples", fill=WHITE, font=font(TITLE_FONT, 34))
    draw.text((552, 608), "$ node scripts/install.mjs ./repo --variant frontend", fill=GREEN, font=font(MONO_FONT, 24))
    draw.text((552, 654), "$ node scripts/install.mjs ./repo --variant frontend --variant consulting", fill=GREEN, font=font(MONO_FONT, 24))
    draw.text((552, 700), "$ node scripts/install.mjs ./repo --variant frontend,consulting", fill=GREEN, font=font(MONO_FONT, 24))

    draw.line((460, 474, 516, 474), fill="#8F99AA", width=6)
    draw.polygon([(516, 474), (498, 462), (498, 486)], fill="#8F99AA")
    draw.text((92, 776), "Example: product agency team = base starter + frontend + consulting", fill=DARK, font=font(BODY_FONT, 32))

    img.save(ASSETS / "variant-composition.png")


def render_onboarding_path() -> None:
    img = Image.new("RGB", (1600, 900), "#F5EFE3")
    draw = ImageDraw.Draw(img)

    card(draw, (32, 32, 1568, 868), PAPER, 30)
    draw.text((90, 92), "First-Day Onboarding Path", fill=DARK, font=font(TITLE_FONT, 46))
    draw.text(
        (92, 146),
        "A low-risk sequence for getting one teammate productive before adding variants or broader MCP access.",
        fill="#5F6978",
        font=font(BODY_FONT, 24),
    )

    stages = [
        ("1. Install", ["base starter", "no variants yet"], ORANGE),
        ("2. Connect", ["GitHub", "docs", "tasks"], YELLOW),
        ("3. Verify", ["/check-setup", "/agents", "/mcp"], GREEN),
        ("4. Try work", ["/review", "/spec", "small diff"], BLUE),
    ]

    start_x = 92
    width = 334
    gap = 24
    for index, (title, bullets, accent) in enumerate(stages):
        x1 = start_x + index * (width + gap)
        x2 = x1 + width
        card(draw, (x1, 250, x2, 660), DARK, 26, "#E8DECF", 2)
        card(draw, (x1 + 26, 278, x1 + 170, 326), accent, 22)
        draw.text((x1 + 48, 290), title, fill=DARK, font=font(TITLE_FONT, 24))
        y = 386
        for bullet in bullets:
            draw.rounded_rectangle((x1 + 38, y + 8, x1 + 54, y + 24), radius=8, fill=accent)
            draw.text((x1 + 70, y), bullet, fill=WHITE, font=font(BODY_FONT, 28))
            y += 76
        if index < len(stages) - 1:
            arrow_x = x2 + 8
            draw.line((arrow_x, 452, arrow_x + 24, 452), fill="#8F99AA", width=6)
            draw.polygon([(arrow_x + 24, 452), (arrow_x + 10, 440), (arrow_x + 10, 464)], fill="#8F99AA")

    card(draw, (94, 716, 1506, 810), SAND, 24)
    draw.text(
        (126, 744),
        "Keep day one narrow: shared baseline first, then one MCP profile, then a harmless review task.",
        fill=DARK,
        font=font(BODY_FONT, 30),
    )

    img.save(ASSETS / "onboarding-path.png")


def render_install_demo() -> None:
    img = Image.new("RGB", (1600, 900), "#F5EFE3")
    lines = [
        ("$ node scripts/install.mjs ./demo-repo --bundle platform-api", GREEN, 24),
        ("copied .claude/settings.json", WHITE, 21),
        ("copied .claude/commands/check-api.md", WHITE, 21),
        ("copied .claude/commands/threat-model.md", WHITE, 21),
        ("copied .claude/commands/release-readiness.md", WHITE, 21),
        ("bundles: platform-api", BLUE, 21),
        ("variants: backend, security, release-engineering", BLUE, 21),
        ("recommended mcp profiles: github-postgres, security-review, release-delivery", MUTED, 18),
        ("install complete: 33 files", GREEN, 22),
    ]
    terminal_window(
        img,
        "Install In One Command",
        "Named bundles turn the starter into a faster rollout path for real team shapes.",
        lines,
        ORANGE,
    )
    img.save(ASSETS / "install-demo.png")


def render_first_run_demo() -> None:
    img = Image.new("RGB", (1600, 900), "#F5EFE3")
    lines = [
        ("$ claude", GREEN, 24),
        ("/help", BLUE, 22),
        ("/check-setup", BLUE, 22),
        ("starter files: ok", WHITE, 20),
        ("commands found: 9", WHITE, 20),
        ("agents found: 6", WHITE, 20),
        ("mcp placeholders still need real env vars", YELLOW, 20),
        ("/mcp", BLUE, 22),
        ("team-onboarding  connected", WHITE, 20),
        ("github-postgres pending env wiring", MUTED, 20),
    ]
    terminal_window(
        img,
        "First Run Stays Predictable",
        "The base session starts narrow: inspect commands, run the setup audit, then verify MCP.",
        lines,
        GREEN,
    )
    img.save(ASSETS / "first-run-demo.png")


def render_terminal_demo_gif() -> None:
    frames = []
    frame_specs = [
        (
            "Step 1: Install",
            "Install with a bundle or a small set of variants.",
            [
                ("$ node scripts/install.mjs ./demo-repo --bundle product-web", GREEN, 22),
                ("copied .claude/settings.json", WHITE, 19),
                ("copied .claude/commands/check-ui.md", WHITE, 19),
                ("copied .claude/commands/release-readiness.md", WHITE, 19),
                ("bundles: product-web", BLUE, 19),
                ("variants: frontend, release-engineering", BLUE, 19),
                ("install complete: 32 files", GREEN, 21),
            ],
            ORANGE,
        ),
        (
            "Step 2: Start Claude",
            "Open the repo and begin with a small first session.",
            [
                ("$ claude", GREEN, 22),
                ("/help", BLUE, 20),
                ("/agents", BLUE, 20),
                ("/check-setup", BLUE, 20),
                ("starter files: ok", WHITE, 19),
                ("agents found: 6", WHITE, 19),
                ("gitignore safety: ok", WHITE, 19),
            ],
            YELLOW,
        ),
        (
            "Step 3: Connect MCP",
            "Wire one small MCP profile before adding broader access.",
            [
                ("/mcp", BLUE, 20),
                ("team-onboarding connected", WHITE, 19),
                ("github-postgres pending env wiring", MUTED, 19),
                ("release-delivery not enabled", MUTED, 19),
                ("next step: review harmless diff", GREEN, 20),
            ],
            GREEN,
        ),
    ]

    for title, subtitle, lines, accent in frame_specs:
        frame = Image.new("RGB", (1280, 720), "#F5EFE3")
        terminal_window(frame, title, subtitle, lines, accent)
        frames.append(frame)

    frames[0].save(
        ASSETS / "terminal-demo.gif",
        save_all=True,
        append_images=frames[1:],
        duration=[1100, 1100, 1400],
        loop=0,
        optimize=False,
    )


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)
    render_social_preview()
    render_readme_preview()
    render_workflow_overview()
    render_variant_composition()
    render_onboarding_path()
    render_install_demo()
    render_first_run_demo()
    render_terminal_demo_gif()
    print("rendered assets")


if __name__ == "__main__":
    main()
