#!/usr/bin/env bash
# ════════════════════════════════════════════════════════════════════════════
# deploy.sh — build, verify, then upload dist/ to Hostinger via rsync/SSH
#             Falls back to lftp (FTP) if SSH_HOST is not set.
#
# Usage:
#   ./scripts/deploy.sh              # full: build + verify + upload
#   ./scripts/deploy.sh --skip-build # verify + upload only (dist/ must exist)
#
# Prerequisites (SSH path):
#   SSH_HOST  = your Hostinger SSH hostname  (e.g. srv123.hstgr.io)
#   SSH_USER  = your Hostinger SSH username  (e.g. u1234567)
#   SSH_PORT  = SSH port (default 65002 for Hostinger)
#   SSH_KEY   = path to private key (default ~/.ssh/id_rsa)
#   REMOTE_PATH = absolute path on server  (default ~/public_html)
#
# Prerequisites (FTP fallback):
#   FTP_HOST  = FTP hostname (same as SSH_HOST usually)
#   FTP_USER  = FTP username
#   FTP_PASS  = FTP password
#
# Set these in your shell or in a local .env.deploy (gitignored) file.
# ════════════════════════════════════════════════════════════════════════════

set -euo pipefail

RESET='\033[0m'
BOLD='\033[1m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'

log()   { echo -e "${BOLD}▶ $*${RESET}"; }
ok()    { echo -e "${GREEN}✔ $*${RESET}"; }
warn()  { echo -e "${YELLOW}⚠ $*${RESET}"; }
err()   { echo -e "${RED}✘ $*${RESET}"; }
info()  { echo -e "${CYAN}  $*${RESET}"; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_DIR/dist"

# Load .env.deploy if it exists (gitignored)
ENV_DEPLOY="$PROJECT_DIR/.env.deploy"
if [[ -f "$ENV_DEPLOY" ]]; then
  # shellcheck disable=SC1090
  source "$ENV_DEPLOY"
  info "Loaded $ENV_DEPLOY"
fi

# Defaults
SSH_PORT="${SSH_PORT:-65002}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/id_rsa}"
REMOTE_PATH="${REMOTE_PATH:-public_html}"
SKIP_BUILD=false

# Parse flags
for arg in "$@"; do
  case $arg in
    --skip-build) SKIP_BUILD=true ;;
  esac
done

# ── Step 1: Build ─────────────────────────────────────────────────────────────

if [[ "$SKIP_BUILD" == false ]]; then
  log "Building..."
  cd "$PROJECT_DIR"
  npm run build
  ok "Build complete"
fi

# ── Step 2: Verify ────────────────────────────────────────────────────────────

log "Running build verification..."
cd "$PROJECT_DIR"
node scripts/verify-build.mjs
ok "Verification passed"

# ── Step 3: Upload ────────────────────────────────────────────────────────────

if [[ -n "${SSH_HOST:-}" ]]; then
  # ── SSH / rsync path ────────────────────────────────────────────────────────
  log "Uploading via rsync + SSH → ${SSH_USER}@${SSH_HOST}:${REMOTE_PATH}"

  RSYNC_SSH="ssh -p ${SSH_PORT} -i ${SSH_KEY} -o StrictHostKeyChecking=accept-new"

  rsync -avz --progress --delete \
    -e "$RSYNC_SSH" \
    "$DIST_DIR/" \
    "${SSH_USER}@${SSH_HOST}:${REMOTE_PATH}/"

  ok "Upload complete"
  info "Live at: https://elan-tech.net"

elif [[ -n "${FTP_HOST:-}" ]]; then
  # ── lftp / FTP fallback ─────────────────────────────────────────────────────
  if ! command -v lftp &>/dev/null; then
    err "lftp not found. Install with: brew install lftp"
    exit 1
  fi

  log "Uploading via lftp (FTP) → ${FTP_USER}@${FTP_HOST}:${REMOTE_PATH}"

  lftp -c "
    set ftp:ssl-allow true;
    set ssl:verify-certificate false;
    open -u '${FTP_USER}','${FTP_PASS}' '${FTP_HOST}';
    mirror --reverse --delete --verbose \
      '$DIST_DIR/' \
      '/${REMOTE_PATH}/';
    quit
  "

  ok "Upload complete"
  info "Live at: https://elan-tech.net"

else
  # ── Manual instructions ─────────────────────────────────────────────────────
  warn "No SSH_HOST or FTP_HOST set — skipping upload."
  echo ""
  echo -e "${BOLD}Manual deploy instructions:${RESET}"
  echo ""
  echo "  Option A  SSH/rsync (recommended — Hostinger Business/Cloud plans):"
  echo ""
  echo "    Create scripts/.env.deploy (gitignored) with:"
  echo "      SSH_HOST=srv123.hstgr.io"
  echo "      SSH_USER=u1234567"
  echo "      SSH_PORT=65002          # Hostinger SSH port"
  echo "      SSH_KEY=~/.ssh/id_rsa   # your key uploaded to Hostinger hPanel"
  echo "      REMOTE_PATH=public_html"
  echo ""
  echo "    Then run:  ./scripts/deploy.sh"
  echo ""
  echo "  Option B  FTP (all plans):"
  echo ""
  echo "    Create scripts/.env.deploy with:"
  echo "      FTP_HOST=files.elan-tech.net"
  echo "      FTP_USER=your_ftp_user"
  echo "      FTP_PASS=your_ftp_pass"
  echo "      REMOTE_PATH=public_html"
  echo ""
  echo "    Then run:  ./scripts/deploy.sh"
  echo ""
  echo "  Option C  Manual upload (Hostinger File Manager):"
  echo ""
  echo "    1. Open Hostinger hPanel → File Manager → public_html"
  echo "    2. Delete existing files (keep .htaccess if already customised)"
  echo "    3. Upload the entire dist/ folder contents"
  echo ""
  echo -e "  Build output: ${CYAN}$DIST_DIR${RESET}  ($(du -sh "$DIST_DIR" | cut -f1))"
  echo ""
fi
