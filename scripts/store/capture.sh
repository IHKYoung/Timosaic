#!/bin/bash
set -euo pipefail
if [ "$#" -ne 2 ]; then
  echo 'Usage: scripts/store/capture.sh IPHONE_SIMULATOR_UUID IPAD_SIMULATOR_UUID' >&2
  exit 2
fi
cd "$(dirname "$0")/../.."
stamp=$(date +%Y%m%d-%H%M%S)
mkdir -p build-store
xcodegen generate
for kind in iphone ipad; do
  if [ "$kind" = iphone ]; then device="$1"; else device="$2"; fi
  if ! xcrun simctl list devices booted | rg -q -- "$device"; then xcrun simctl boot "$device"; fi
  xcrun simctl bootstatus "$device" -b
  xcrun simctl status_bar "$device" override --time '9:41' --dataNetwork wifi --wifiMode active --wifiBars 3 --cellularMode active --cellularBars 4 --batteryState discharging --batteryLevel 100
  result="build-store/${kind}-${stamp}.xcresult"
  xcodebuild -project Timosaic.xcodeproj -scheme Timosaic \
    -destination "platform=iOS Simulator,id=$device" -derivedDataPath build-store \
    -parallel-testing-enabled NO -collect-test-diagnostics never \
    -resultBundlePath "$result" -only-testing:TimosaicUITests/StoreCaptureTests \
    CODE_SIGNING_ALLOWED=NO test > "build-store/${kind}-${stamp}.log" 2>&1
  python3 scripts/export-evidence.py "$result" "store/raw/$kind"
done
