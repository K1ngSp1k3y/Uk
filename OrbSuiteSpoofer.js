/**
 * @name OrbSuiteSpoofer
 * @description Self-only cosmetic shop & Nitro preview, badges, 100-device spoofer, and settings menu for Revenge/Vendetta.
 * @author KingSpikey
 * @version 2.5.0
 */
(() => {
  const api = globalThis.revenge ?? globalThis.vendetta;

  const TIER_LABEL = { 1: "Nitro Classic", 2: "Nitro", 3: "Nitro Basic" };
  const TIER_CYCLE = { 2: 3, 3: 1, 1: 2 };

  const THEME_PRESETS = [
    { name: "Liquid Purple -> Neon Violet", colors: [0x1b1035, 0x8b5cf6] },
    { name: "Matte Charcoal -> Obsidian", colors: [0x0c0c11, 0x262634] },
    { name: "Blurple -> Pink", colors: [0x5865f2, 0xeb4599] },
    { name: "Emerald Cyber", colors: [0x064e3b, 0x10b981] },
    { name: "Crimson Sunset", colors: [0x7f1d1d, 0xf97316] },
  ];

  const BASE_DEVICES = [
    { id: "iphone-16-pro-max", label: "iPhone 16 Pro Max", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
    { id: "iphone-16-pro", label: "iPhone 16 Pro", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
    { id: "iphone-16", label: "iPhone 16", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
    { id: "iphone-15-pro-max", label: "iPhone 15 Pro Max", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
    { id: "iphone-15-pro", label: "iPhone 15 Pro", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
    { id: "iphone-15", label: "iPhone 15", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
    { id: "iphone-14-pro-max", label: "iPhone 14 Pro Max", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
    { id: "iphone-14-pro", label: "iPhone 14 Pro", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
    { id: "iphone-14", label: "iPhone 14", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
    { id: "iphone-13-pro", label: "iPhone 13 Pro", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
    { id: "iphone-13-mini", label: "iPhone 13 mini", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
    { id: "iphone-se-3", label: "iPhone SE (3rd Gen)", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
    { id: "ipad-pro-m4-13", label: "iPad Pro 13 (M4)", os: "iPadOS", browser: "Discord iOS", clientType: "Tablet" },
    { id: "ipad-pro-m4-11", label: "iPad Pro 11 (M4)", os: "iPadOS", browser: "Discord iOS", clientType: "Tablet" },
    { id: "ipad-air-m2", label: "iPad Air (M2)", os: "iPadOS", browser: "Discord iOS", clientType: "Tablet" },
    { id: "ipad-mini-7", label: "iPad mini (A17 Pro)", os: "iPadOS", browser: "Discord iOS", clientType: "Tablet" },
    { id: "galaxy-s25-ultra", label: "Galaxy S25 Ultra", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "galaxy-s25-plus", label: "Galaxy S25+", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "galaxy-s25", label: "Galaxy S25", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "galaxy-s24-ultra", label: "Galaxy S24 Ultra", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "galaxy-s24", label: "Galaxy S24", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "galaxy-z-fold-6", label: "Galaxy Z Fold6", os: "Android", browser: "Discord Android", clientType: "Foldable" },
    { id: "galaxy-z-flip-6", label: "Galaxy Z Flip6", os: "Android", browser: "Discord Android", clientType: "Foldable" },
    { id: "galaxy-a55-5g", label: "Galaxy A55 5G", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "galaxy-a35-5g", label: "Galaxy A35 5G", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "galaxy-a16-5g", label: "Galaxy A16 5G", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "galaxy-tab-s10-ultra", label: "Galaxy Tab S10 Ultra", os: "Android", browser: "Discord Android", clientType: "Tablet" },
    { id: "pixel-9-pro-xl", label: "Pixel 9 Pro XL", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "pixel-9-pro", label: "Pixel 9 Pro", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "pixel-9", label: "Pixel 9", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "pixel-9-pro-fold", label: "Pixel 9 Pro Fold", os: "Android", browser: "Discord Android", clientType: "Foldable" },
    { id: "pixel-8a", label: "Pixel 8a", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "oneplus-13", label: "OnePlus 13", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "oneplus-12", label: "OnePlus 12", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "nothing-phone-2a", label: "Nothing Phone (2a)", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "sony-xperia-1-vi", label: "Sony Xperia 1 VI", os: "Android", browser: "Discord Android", clientType: "Mobile" },
    { id: "rog-phone-8-pro", label: "ASUS ROG Phone 8 Pro", os: "Android", browser: "Discord Android", clientType: "Gaming Mobile" },
    { id: "redmagic-9s-pro", label: "RedMagic 9S Pro", os: "Android", browser: "Discord Android", clientType: "Gaming Mobile" },
    { id: "quest-2", label: "Meta Quest 2", os: "Android", browser: "Horizon OS", clientType: "VR" },
    { id: "quest-3", label: "Meta Quest 3", os: "Android", browser: "Horizon OS", clientType: "VR" },
    { id: "quest-3s", label: "Meta Quest 3S", os: "Android", browser: "Horizon OS", clientType: "VR" },
    { id: "quest-pro", label: "Meta Quest Pro", os: "Android", browser: "Horizon OS", clientType: "VR" },
    { id: "ps5-pro", label: "PlayStation 5 Pro", os: "Orbis", browser: "Discord Console", clientType: "Console" },
    { id: "ps5-slim", label: "PlayStation 5 Slim", os: "Orbis", browser: "Discord Console", clientType: "Console" },
    { id: "xbox-series-x", label: "Xbox Series X", os: "Xbox", browser: "Discord Console", clientType: "Console" },
    { id: "xbox-series-s", label: "Xbox Series S", os: "Xbox", browser: "Discord Console", clientType: "Console" },
    { id: "steam-deck-oled", label: "Steam Deck OLED", os: "Linux", browser: "Discord Client", clientType: "Handheld" },
    { id: "rog-ally-x", label: "ASUS ROG Ally X", os: "Windows", browser: "Discord Client", clientType: "Handheld" },
    { id: "win11-desktop", label: "Windows 11 Desktop", os: "Windows", browser: "Discord Client", clientType: "Desktop" },
    { id: "macos-sequoia-mbp", label: "MacBook Pro (macOS)", os: "Mac OS X", browser: "Discord Client", clientType: "Desktop" },
    { id: "ubuntu-desktop", label: "Ubuntu Linux Desktop", os: "Linux", browser: "Discord Client", clientType: "Desktop" },
    { id: "chrome-web", label: "Google Chrome Web", os: "Windows", browser: "Chrome", clientType: "Web" },
  ];

  const EXTRA_MODELS = [
    ["iPhone 12 Pro", "iOS", "Discord iOS", "Mobile"],
    ["iPhone 11", "iOS", "Discord iOS", "Mobile"],
    ["iPad Air (5th Gen)", "iPadOS", "Discord iOS", "Tablet"],
    ["iPad (10th Gen)", "iPadOS", "Discord iOS", "Tablet"],
    ["Galaxy S23 Ultra", "Android", "Discord Android", "Mobile"],
    ["Galaxy S23+", "Android", "Discord Android", "Mobile"],
    ["Galaxy S23", "Android", "Discord Android", "Mobile"],
    ["Galaxy S22 Ultra", "Android", "Discord Android", "Mobile"],
    ["Galaxy A54 5G", "Android", "Discord Android", "Mobile"],
    ["Galaxy A25 5G", "Android", "Discord Android", "Mobile"],
    ["Galaxy A15 5G", "Android", "Discord Android", "Mobile"],
    ["Galaxy Z Fold5", "Android", "Discord Android", "Foldable"],
    ["Galaxy Z Flip5", "Android", "Discord Android", "Foldable"],
    ["Galaxy Tab S9", "Android", "Discord Android", "Tablet"],
    ["Galaxy Tab A9+", "Android", "Discord Android", "Tablet"],
    ["Pixel 8 Pro", "Android", "Discord Android", "Mobile"],
    ["Pixel 8", "Android", "Discord Android", "Mobile"],
    ["Pixel 7a", "Android", "Discord Android", "Mobile"],
    ["Pixel Fold", "Android", "Discord Android", "Foldable"],
    ["Pixel Tablet", "Android", "Discord Android", "Tablet"],
    ["OnePlus 12R", "Android", "Discord Android", "Mobile"],
    ["OnePlus Nord 4", "Android", "Discord Android", "Mobile"],
    ["Nothing Phone (2)", "Android", "Discord Android", "Mobile"],
    ["Nothing Phone (1)", "Android", "Discord Android", "Mobile"],
    ["Motorola Edge 50 Pro", "Android", "Discord Android", "Mobile"],
    ["Motorola Razr+ (2024)", "Android", "Discord Android", "Foldable"],
    ["Xiaomi 14 Ultra", "Android", "Discord Android", "Mobile"],
    ["Xiaomi 14", "Android", "Discord Android", "Mobile"],
    ["Redmi Note 13 Pro+", "Android", "Discord Android", "Mobile"],
    ["POCO F6 Pro", "Android", "Discord Android", "Mobile"],
    ["Realme GT 6", "Android", "Discord Android", "Mobile"],
    ["Vivo X100 Pro", "Android", "Discord Android", "Mobile"],
    ["OPPO Find X7 Ultra", "Android", "Discord Android", "Mobile"],
    ["Honor Magic6 Pro", "Android", "Discord Android", "Mobile"],
    ["Fairphone 5", "Android", "Discord Android", "Mobile"],
    ["Lenovo Legion Go", "Windows", "Discord Client", "Handheld"],
    ["MSI Claw A1M", "Windows", "Discord Client", "Handheld"],
    ["MacBook Air M3", "Mac OS X", "Discord Client", "Desktop"],
    ["Mac mini M4", "Mac OS X", "Discord Client", "Desktop"],
    ["iMac 24 M3", "Mac OS X", "Discord Client", "Desktop"],
    ["Windows 10 Workstation", "Windows", "Discord Client", "Desktop"],
    ["Windows 11 Gaming Rig", "Windows", "Discord Client", "Desktop"],
    ["Arch Linux Desktop", "Linux", "Discord Client", "Desktop"],
    ["Fedora Workstation", "Linux", "Discord Client", "Desktop"],
    ["ChromeOS Chromebook", "Chrome OS", "Chrome", "Web"],
    ["Firefox Web Client", "Windows", "Firefox", "Web"],
    ["Edge Web Client", "Windows", "Edge", "Web"],
    ["Safari iOS Web", "iOS", "Mobile Safari", "Web"],
  ];

  const DEVICE_PRESETS = BASE_DEVICES.concat(
    EXTRA_MODELS.map(([label, os, browser, clientType], idx) => ({
      id: `dev-${String(idx + BASE_DEVICES.length + 1).padStart(3, "0")}`,
      label,
      os,
      browser,
      clientType,
    }))
  ).slice(0, 100);

  const SHOP_CATALOG = [
    { id: "orb-pack-2500", name: "2,500 Orbs Showcase Pack", priceOrbs: 0, type: "orb", value: 2500 },
    { id: "orb-pack-10000", name: "10,000 Orbs Showcase Pack", priceOrbs: 0, type: "orb", value: 10000 },
    { id: "avatar-neon-void", name: "Neon Void Avatar Frame", priceOrbs: 500, type: "cosmetic", key: "avatarFrame" },
    { id: "effect-starlight-pulse", name: "Starlight Pulse Profile Effect", priceOrbs: 800, type: "cosmetic", key: "profileEffect" },
    { id: "plate-obsidian-glass", name: "Obsidian Liquid Nameplate", priceOrbs: 750, type: "cosmetic", key: "nameplate" },
    { id: "bundle-full-nitro", name: "Full Nitro Cosmetics Suite", priceOrbs: 1200, type: "bundle", key: "nitroSuite" },
  ];

  const FLAG_EARLY_SUPPORTER = 1 << 9;
  const FLAG_HYPESQUAD_BRAVERY = 1 << 8;
  const FLAG_ACTIVE_DEVELOPER = 1 << 22;
  const UPLOAD_CAP = 500 * 1024 * 1024;
  const BIO_CAP = 190;
  const PREMIUM_SINCE = new Date("2020-01-01T00:00:00.000Z").toISOString();

  const DEFAULTS = {
    enabled: true,
    localOnlyMode: true,
    orbBalance: 5000,
    ownedItems: ["avatar-neon-void", "bundle-full-nitro"],
    nitroSuite: true,
    avatarFrame: true,
    profileEffect: true,
    nameplate: true,
    tier: 2,
    theme: true,
    themePreset: 0,
    badgeEarlySupporter: true,
    badgeHypesquad: false,
    badgeActiveDev: false,
    giftBoxes: true,
    emoji: true,
    stickers: true,
    appIcons: true,
    soundboard: true,
    hdStream: true,
    uploadsLocalCap: true,
    longBio: true,
    deviceSpoof: true,
    devicePreset: 0,
  };

  let config = { ...DEFAULTS };
  let patches = [];
  let constantOriginals = [];
  let userOriginals = new Map();
  let diagnostics = [];
  let ownId = null;
  let loaded = false;
  let retryTimer = null;

  function sanitizeConfig(raw) {
    if (!raw || typeof raw !== "object") return { ...DEFAULTS };
    const next = { ...DEFAULTS };
    for (const key of Object.keys(DEFAULTS)) {
      if (key in raw && raw[key] !== undefined) {
        next[key] = raw[key];
      }
    }
    if (!Array.isArray(next.ownedItems)) next.ownedItems = [...DEFAULTS.ownedItems];
    if (typeof next.orbBalance !== "number" || !Number.isFinite(next.orbBalance) || next.orbBalance < 0) {
      next.orbBalance = DEFAULTS.orbBalance;
    }
    if (typeof next.themePreset !== "number" || next.themePreset < 0 || next.themePreset >= THEME_PRESETS.length) {
      next.themePreset = 0;
    }
    if (typeof next.devicePreset !== "number" || next.devicePreset < 0 || next.devicePreset >= DEVICE_PRESETS.length) {
      next.devicePreset = 0;
    }
    if (!TIER_LABEL[next.tier]) next.tier = 2;
    return next;
  }

  function readConfig() {
    try {
      if (api?.storage && typeof api.storage.get === "function") {
        const res = api.storage.get("config", DEFAULTS);
        if (res && typeof res.then === "function") {
          res.then((val) => {
            config = sanitizeConfig(val);
            if (loaded) applyAll();
          }).catch(() => {});
          return;
        }
        config = sanitizeConfig(res);
        return;
      }
      if (api?.storage?.config && typeof api.storage.config === "object") {
        config = sanitizeConfig(JSON.parse(JSON.stringify(api.storage.config)));
      }
    } catch {}
  }

  function persist() {
    try {
      const snap = JSON.parse(JSON.stringify(config));
      if (api?.storage && typeof api.storage.set === "function") {
        const p = api.storage.set("config", snap);
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
      if (api?.storage && "config" in api.storage) {
        api.storage.config = snap;
      }
    } catch {}
  }

  function repaint() {
    if (!api?.flux?.dispatch) return;
    for (const type of ["CURRENT_USER_UPDATE", "USER_PROFILE_UPDATE", "APP_ICON_UPDATED"]) {
      try {
        api.flux.dispatch({ type });
      } catch {}
    }
  }

  function record(name, ok, detail) {
    diagnostics.push({ name, ok, detail: detail || (ok ? "ok" : "not found") });
    return ok;
  }

  function surface(name, fn) {
    try {
      const ok = fn();
      if (ok !== false) record(name, true);
      else record(name, false, "module not found");
    } catch (e) {
      record(name, false, String(e?.message || e));
    }
  }

  function hook(target, method, cb) {
    if (!target || typeof target[method] !== "function" || !api?.patcher) return false;
    const wrapped = (args, res) => cb(Array.isArray(args) ? args : [], res);
    try {
      let unpatch;
      if (typeof api.patcher.after === "function") {
        unpatch = api.patcher.after(target, method, wrapped);
      } else if (typeof api.patcher.hook === "function") {
        unpatch = api.patcher.hook(target, method, (_self, args, res) => wrapped(args, res));
      } else {
        return false;
      }
      if (typeof unpatch === "function") {
        patches.push(unpatch);
        return true;
      }
    } catch (err) {
      console.warn("[OrbSuiteSpoofer] Hook failed:", err);
    }
    return false;
  }

  function lookup(...candidates) {
    if (!api?.metro?.findByProps) return null;
    for (const props of candidates) {
      try {
        const mod = api.metro.findByProps(...props);
        if (mod) return mod;
      } catch {}
    }
    return null;
  }

  function getOwnId(store) {
    try {
      const s = store ?? lookup(["getCurrentUser", "getUser"], ["getCurrentUser"]);
      const id = s?.getCurrentUser?.()?.id;
      if (id != null) ownId = id;
    } catch {}
    return ownId;
  }

  function spoofUser(user) {
    if (!user || typeof user !== "object" || !config.enabled || !user.id) return user;
    if (user.id !== getOwnId()) return user;

    if (!userOriginals.has(user.id)) {
      userOriginals.set(user.id, {
        premiumType: user.premiumType,
        premiumSince: user.premiumSince,
        premiumGiftBoxCount: user.premiumGiftBoxCount,
        flags: user.flags,
        publicFlags: user.publicFlags,
      });
    }

    if (config.nitroSuite) {
      user.premiumType = config.tier;
      if (!user.premiumSince) user.premiumSince = PREMIUM_SINCE;
      if (config.giftBoxes && !user.premiumGiftBoxCount) user.premiumGiftBoxCount = 3;
    }

    let flags = user.flags | 0;
    let pubFlags = user.publicFlags | 0;
    if (config.badgeEarlySupporter) {
      flags |= FLAG_EARLY_SUPPORTER;
      pubFlags |= FLAG_EARLY_SUPPORTER;
    }
    if (config.badgeHypesquad) {
      flags |= FLAG_HYPESQUAD_BRAVERY;
      pubFlags |= FLAG_HYPESQUAD_BRAVERY;
    }
    if (config.badgeActiveDev) {
      flags |= FLAG_ACTIVE_DEVELOPER;
      pubFlags |= FLAG_ACTIVE_DEVELOPER;
    }
    user.flags = flags;
    user.publicFlags = pubFlags;

    return user;
  }

  function restoreUsers() {
    const store = lookup(["getCurrentUser", "getUser"], ["getCurrentUser"], ["getUser"]);
    for (const [id, saved] of userOriginals) {
      try {
        const user = store?.getUser?.(id) ?? (store?.getCurrentUser?.()?.id === id ? store.getCurrentUser() : null);
        if (!user) continue;
        for (const key of Object.keys(saved)) {
          user[key] = saved[key];
        }
      } catch {}
    }
    userOriginals.clear();
  }

  function patchUsers() {
    surface("self-only badges & nitro", () => {
      const store = lookup(["getCurrentUser", "getUser"], ["getCurrentUser"], ["getUser"]);
      if (!store) return false;
      getOwnId(store);
      const isMe = (id) => id != null && id === getOwnId(store);

      let any = false;
      if (hook(store, "getCurrentUser", (_args, res) => spoofUser(res))) any = true;
      if (hook(store, "getUser", (args, res) => (isMe(args[0]) ? spoofUser(res) : res))) any = true;
      if (
        hook(store, "getUsers", (_args, res) => {
          if (Array.isArray(res)) {
            for (const u of res) {
              if (u && isMe(u.id)) spoofUser(u);
            }
          }
          return res;
        })
      ) {
        any = true;
      }
      return any;
    });
  }

  function patchShopAndNitro() {
    surface("local shop & nitro suite", () => {
      const store = lookup(["getPremiumTypeSubscription"], ["getPremiumSubscription"]);
      let any = false;
      if (store && config.nitroSuite) {
        if (hook(store, "getPremiumTypeSubscription", (_args, res) => (config.enabled ? { premiumType: config.tier } : res))) {
          any = true;
        }
        if (
          hook(store, "getPremiumSubscription", (_args, res) =>
            config.enabled ? { premiumType: config.tier, isPremium: true } : res
          )
        ) {
          any = true;
        }
      }

      globalThis.__ORB_SUITE_SHOP__ = {
        localOnly: true,
        visibleToOthers: false,
        orbBalance: config.orbBalance,
        ownedItems: [...config.ownedItems],
        cosmetics: {
          avatarFrame: Boolean(config.avatarFrame),
          profileEffect: Boolean(config.profileEffect),
          nameplate: Boolean(config.nameplate),
          nitroSuite: Boolean(config.nitroSuite),
        },
      };
      return any || Boolean(globalThis.__ORB_SUITE_SHOP__);
    });
  }

  function patchCosmetics() {
    surface("nitro perks & cosmetics", () => {
      let any = false;
      if (config.emoji) {
        const mod = lookup(["canUseEmojisEverywhere"], ["canUseAnimatedEmojis"], ["canUseExternalEmojis"]);
        if (mod) {
          for (const m of ["canUseEmojisEverywhere", "canUseAnimatedEmojis", "canUseExternalEmojis"]) {
            if (hook(mod, m, (_args, res) => (config.enabled ? true : res))) any = true;
          }
        }
      }
      if (config.stickers) {
        const mod = lookup(["canUseStickersEverywhere"], ["canUseExternalStickers"], ["canUseCustomStickersEverywhere"]);
        if (mod) {
          for (const m of ["canUseStickersEverywhere", "canUseExternalStickers", "canUseCustomStickersEverywhere"]) {
            if (hook(mod, m, (_args, res) => (config.enabled ? true : res))) any = true;
          }
        }
      }
      if (config.appIcons) {
        const mod = lookup(["canUseAppIcons"], ["getCurrentAppIcon"], ["canUseCustomAppIcons"]);
        if (mod) {
          for (const m of ["canUseAppIcons", "canUseCustomAppIcons"]) {
            if (hook(mod, m, (_args, res) => (config.enabled ? true : res))) any = true;
          }
        }
      }
      if (config.soundboard || config.hdStream) {
        const mod = lookup(["canUseSoundboardEverywhere"], ["canStreamHighQuality"], ["canUseCustomCallSounds"]);
        if (mod) {
          if (config.soundboard) {
            for (const m of ["canUseSoundboardEverywhere", "canUseCustomCallSounds"]) {
              if (hook(mod, m, (_args, res) => (config.enabled ? true : res))) any = true;
            }
          }
          if (config.hdStream) {
            for (const m of ["canStreamHighQuality", "canUseHighVideoUploadQuality"]) {
              if (hook(mod, m, (_args, res) => (config.enabled ? true : res))) any = true;
            }
          }
        }
      }
      return any;
    });
  }

  function patchConstantsAndProfile() {
    surface("profile theme & local caps", () => {
      let any = false;
      if (config.uploadsLocalCap || config.longBio) {
        const holder = lookup(["NitroConstants"])?.NitroConstants ?? lookup(["MAX_UPLOAD_SIZE"], ["MAX_ABOUT_ME_LENGTH"]);
        if (holder) {
          if (config.uploadsLocalCap) {
            for (const key of ["MAX_UPLOAD_SIZE", "MAX_UPLOAD_SIZE_BOOSTED", "MAX_ATTACHMENT_SIZE"]) {
              const value = holder[key];
              if (typeof value === "number" && value < UPLOAD_CAP) {
                constantOriginals.push([holder, key, value]);
                holder[key] = UPLOAD_CAP;
                any = true;
              }
            }
          }
          if (config.longBio && typeof holder.MAX_ABOUT_ME_LENGTH === "number" && holder.MAX_ABOUT_ME_LENGTH < BIO_CAP) {
            constantOriginals.push([holder, "MAX_ABOUT_ME_LENGTH", holder.MAX_ABOUT_ME_LENGTH]);
            holder.MAX_ABOUT_ME_LENGTH = BIO_CAP;
            any = true;
          }
        }
      }
      if (config.theme) {
        const store = lookup(["getUserProfile"], ["getUserProfile", "getGuildMemberProfile"]);
        if (store) {
          const preset = THEME_PRESETS[config.themePreset] ?? THEME_PRESETS[0];
          if (
            hook(store, "getUserProfile", (args, res) => {
              if (!res || typeof res !== "object" || !config.enabled || args[0] !== getOwnId()) return res;
              res.premiumType = config.tier;
              if (!res.premiumSince) res.premiumSince = PREMIUM_SINCE;
              res.themeColors = preset.colors;
              return res;
            })
          ) {
            any = true;
          }
        }
      }
      return any;
    });
  }

  function patchDeviceSpoofer() {
    if (!config.deviceSpoof) return;
    surface(`device spoofer (${DEVICE_PRESETS.length} presets)`, () => {
      const preset = DEVICE_PRESETS[config.devicePreset] ?? DEVICE_PRESETS[0];
      const mod = lookup(
        ["getOS", "getDevice"],
        ["getPlatform", "isMobile"],
        ["getSuperProperties", "getDeviceProperties"]
      );
      let any = false;
      if (mod) {
        for (const fnName of ["getOS", "getPlatformName", "getPlatform"]) {
          if (hook(mod, fnName, (_args, res) => (config.enabled ? preset.os : res))) any = true;
        }
        for (const fnName of ["getDevice", "getDeviceModel"]) {
          if (hook(mod, fnName, (_args, res) => (config.enabled ? preset.label : res))) any = true;
        }
      }
      globalThis.__ORB_SUITE_DEVICE__ = {
        enabled: true,
        index: config.devicePreset,
        totalPresets: DEVICE_PRESETS.length,
        ...preset,
      };
      return any || Boolean(globalThis.__ORB_SUITE_DEVICE__);
    });
  }

  function applyAll() {
    revertAll(false);
    diagnostics = [];

    if (!api || !api.patcher || !api.metro) {
      record("revenge api", false, "patcher or metro missing");
      return;
    }

    if (!config.enabled) {
      record("master switch", false, "disabled");
      repaint();
      return;
    }

    patchUsers();
    patchShopAndNitro();
    patchCosmetics();
    patchConstantsAndProfile();
    patchDeviceSpoofer();
    repaint();
  }

  function revertAll(shouldRepaint = true) {
    for (const unpatch of patches.splice(0)) {
      try {
        unpatch();
      } catch {}
    }
    for (const [holder, key, value] of constantOriginals.splice(0)) {
      try {
        holder[key] = value;
      } catch {}
    }
    restoreUsers();
    delete globalThis.__ORB_SUITE_SHOP__;
    delete globalThis.__ORB_SUITE_DEVICE__;
    if (shouldRepaint) repaint();
  }

  function purchaseShopItem(item, bumpFn) {
    if (item.type === "orb") {
      config.orbBalance += item.value;
      persist();
      applyAll();
      bumpFn((n) => n + 1);
      return;
    }
    if (!config.ownedItems.includes(item.id)) {
      if (config.orbBalance < item.priceOrbs) {
        config.orbBalance += item.priceOrbs;
      }
      config.orbBalance -= item.priceOrbs;
      config.ownedItems.push(item.id);
    }
    if (item.key) {
      config[item.key] = true;
    }
    persist();
    applyAll();
    bumpFn((n) => n + 1);
  }

  function getReactAndComponents() {
    const React =
      api?.metro?.common?.React ??
      globalThis.React ??
      lookup(["createElement", "useState"]) ??
      null;

    const rawC = api?.ui?.components ?? {};
    const RN = lookup(["ScrollView", "View", "Text"], ["TouchableOpacity"]) ?? {};

    const FallbackRow = (props = {}) => {
      if (!React?.createElement) return null;
      const TextComp = rawC.FormText ?? rawC.Text ?? RN.Text ?? "span";
      const ViewComp = rawC.View ?? RN.View ?? "div";
      const PressComp = rawC.TouchableOpacity ?? RN.TouchableOpacity ?? ViewComp;
      return React.createElement(
        PressComp,
        {
          onPress: props.onPress,
          style: { paddingVertical: 10, paddingHorizontal: 14 },
        },
        React.createElement(TextComp, { style: { fontWeight: "600" } }, props.label || ""),
        props.subLabel ? React.createElement(TextComp, { style: { opacity: 0.7, fontSize: 12 } }, props.subLabel) : null
      );
    };

    const FallbackSwitch = (props = {}) => {
      if (!React?.createElement) return null;
      const TextComp = rawC.FormText ?? rawC.Text ?? RN.Text ?? "span";
      const ViewComp = rawC.View ?? RN.View ?? "div";
      const PressComp = rawC.TouchableOpacity ?? RN.TouchableOpacity ?? ViewComp;
      return React.createElement(
        PressComp,
        {
          onPress: () => props.onValueChange?.(!props.value),
          style: { paddingVertical: 10, paddingHorizontal: 14 },
        },
        React.createElement(TextComp, { style: { fontWeight: "600" } }, `${props.label || ""} [${props.value ? "ON" : "OFF"}]`),
        props.subLabel ? React.createElement(TextComp, { style: { opacity: 0.7, fontSize: 12 } }, props.subLabel) : null
      );
    };

    const FallbackSection = (props = {}) => {
      if (!React?.createElement) return null;
      const ViewComp = rawC.View ?? RN.View ?? "div";
      const ScrollComp = rawC.ScrollView ?? RN.ScrollView ?? ViewComp;
      return React.createElement(ScrollComp, { style: { flex: 1 } }, props.children);
    };

    const C = {
      FormSection: rawC.FormSection ?? FallbackSection,
      FormRow: rawC.FormRow ?? FallbackRow,
      FormSwitchRow: rawC.FormSwitchRow ?? FallbackSwitch,
      FormDivider: rawC.FormDivider ?? null,
    };

    return { React, C };
  }

  function renderSettingsElement() {
    const { React, C } = getReactAndComponents();
    if (!React || typeof React.createElement !== "function") {
      return null;
    }

    const h = React.createElement;
    const [, bump] = React.useState(0);
    const section = C.FormSection;
    const divider = C.FormDivider ? h(C.FormDivider) : null;
    const dev = DEVICE_PRESETS[config.devicePreset] ?? DEVICE_PRESETS[0];
    const theme = THEME_PRESETS[config.themePreset] ?? THEME_PRESETS[0];
    const okCount = diagnostics.filter((d) => d.ok).length;

    const set = (key, value) => {
      config[key] = value;
      persist();
      if (key === "enabled" && !value) {
        revertAll(true);
      } else {
        applyAll();
      }
      bump((n) => n + 1);
    };

    const sw = (label, sub, key) =>
      h(C.FormSwitchRow, {
        label,
        subLabel: sub,
        value: !!config[key],
        onValueChange: (v) => set(key, v),
      });

    return h(
      section,
      { title: "OrbSuite Spoofer (Self-Only Cosmetic)" },
      sw("Master enabled", "Visible locally only; not shown to other users.", "enabled"),
      divider,
      h(C.FormRow, {
        label: "Local Orb Showcase Balance",
        subLabel: `${config.orbBalance} Orbs · Owned items: ${config.ownedItems.length}/${SHOP_CATALOG.length} · Tap to +2,500`,
        onPress: () => {
          config.orbBalance += 2500;
          persist();
          applyAll();
          bump((n) => n + 1);
        },
      }),
      ...SHOP_CATALOG.map((item) => {
        const owned = item.type !== "orb" && config.ownedItems.includes(item.id);
        return h(C.FormRow, {
          key: item.id,
          label: item.name,
          subLabel:
            item.type === "orb"
              ? `Tap to add +${item.value} local Orbs`
              : owned
              ? "Unlocked locally · Tap to toggle/re-apply"
              : `Cost: ${item.priceOrbs} Orbs · Tap to unlock locally`,
          onPress: () => purchaseShopItem(item, bump),
        });
      }),
      divider,
      sw("Full Nitro Cosmetics Suite", "Client-side Nitro preview, gift boxes, emoji/stickers & HD toggles.", "nitroSuite"),
      sw("Avatar Frame Cosmetic", "Local avatar frame state.", "avatarFrame"),
      sw("Profile Effect Cosmetic", "Local profile effect state.", "profileEffect"),
      sw("Nameplate Cosmetic", "Local nameplate state.", "nameplate"),
      sw("Early Supporter Badge", "Local badge bitflag on your account.", "badgeEarlySupporter"),
      sw("HypeSquad Bravery Badge", "Local badge bitflag on your account.", "badgeHypesquad"),
      sw("Active Developer Badge", "Local badge bitflag on your account.", "badgeActiveDev"),
      sw("Profile Gradient Theme", `Preset: ${theme.name}`, "theme"),
      h(C.FormRow, {
        label: "Cycle Profile Gradient",
        subLabel: theme.name,
        onPress: () => set("themePreset", (config.themePreset + 1) % THEME_PRESETS.length),
      }),
      h(C.FormRow, {
        label: "Cycle Nitro Tier",
        subLabel: TIER_LABEL[config.tier] ?? "Nitro",
        onPress: () => set("tier", TIER_CYCLE[config.tier] ?? 2),
      }),
      sw("Local Upload & Bio Cap", "Raises local constants (server still enforces real limits).", "uploadsLocalCap"),
      divider,
      sw("Device Spoofer (100 Presets)", `Active (${config.devicePreset + 1}/100): ${dev.label}`, "deviceSpoof"),
      h(C.FormRow, {
        label: "Next Device Preset",
        subLabel: `[${config.devicePreset + 1}/100] ${dev.label} · ${dev.os} (${dev.clientType})`,
        onPress: () => set("devicePreset", (config.devicePreset + 1) % DEVICE_PRESETS.length),
      }),
      h(C.FormRow, {
        label: "Jump +10 Device Presets",
        subLabel: `Current: #${config.devicePreset + 1} ${dev.label}`,
        onPress: () => set("devicePreset", (config.devicePreset + 10) % DEVICE_PRESETS.length),
      }),
      h(C.FormRow, {
        label: "Re-apply Patches",
        subLabel: `${patches.length} active · ${okCount}/${diagnostics.length} surfaces`,
        onPress: () => {
          applyAll();
          bump((n) => n + 1);
        },
      }),
      divider,
      h(
        section,
        { title: "Diagnostics" },
        ...(diagnostics.length
          ? diagnostics.map((d, i) => h(C.FormRow, { key: String(i), label: d.name, subLabel: d.detail }))
          : [h(C.FormRow, { key: "none", label: "Nothing applied yet" })])
      )
    );
  }

  function Settings(props) {
    return renderSettingsElement(props);
  }
  Settings.default = Settings;
  Settings.Settings = Settings;
  Settings.component = Settings;

  function openQuickMenu() {
    globalThis.__ORB_SUITE_MENU__ = {
      open: true,
      orbBalance: config.orbBalance,
      device: DEVICE_PRESETS[config.devicePreset] ?? DEVICE_PRESETS[0],
    };
  }

  return {
    onLoad() {
      if (loaded) return;
      loaded = true;
      readConfig();
      applyAll();

      if (config.enabled && !patches.length) {
        retryTimer = setTimeout(() => {
          retryTimer = null;
          if (loaded && config.enabled && !patches.length) applyAll();
        }, 1500);
      }
      console.log("[OrbSuiteSpoofer] loaded", patches.length, "patches");
    },

    onUnload() {
      loaded = false;
      if (retryTimer) {
        clearTimeout(retryTimer);
        retryTimer = null;
      }
      revertAll(true);
      delete globalThis.__ORB_SUITE_MENU__;
      console.log("[OrbSuiteSpoofer] unloaded");
    },

    openMenu: openQuickMenu,
    settings: Settings,
    Settings,
  };
})();
