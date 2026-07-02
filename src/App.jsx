import { useState, useEffect, useRef } from "react";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; overflow: hidden; }
    #root { height: 100%; }

    .app {
      height: 100vh;
      height: 100dvh;
      background: #F5F0E8;
      font-family: 'Nunito', sans-serif;
      color: #1E2D4A;
      max-width: 430px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }

    /* ── SCROLLABLE AREA ── */
    .screen-scroll {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
    .screen-scroll::-webkit-scrollbar { display: none; }

    /* ── AUTH ── */
    .auth-wrap {
      height: 100vh;
      height: 100dvh;
      display: flex;
      flex-direction: column;
      background: #1E2D4A;
      overflow: hidden;
    }
    .auth-top {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 28px 24px;
      position: relative;
      overflow: hidden;
    }
    .auth-blob1 { position:absolute;top:-60px;right:-60px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,#E8A598,transparent 70%);opacity:.12;pointer-events:none; }
    .auth-blob2 { position:absolute;bottom:-40px;left:-40px;width:160px;height:160px;border-radius:50%;background:radial-gradient(circle,#7ABFCC,transparent 70%);opacity:.15;pointer-events:none; }

    .auth-logo-circle {
      width: 76px; height: 76px; border-radius: 50%;
      border: 2px solid rgba(232,165,152,.5);
      display: flex; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.04);
      margin-bottom: 16px;
    }
    .auth-app-name {
      font-family: 'Playfair Display', serif;
      font-size: 30px; font-weight: 400; color: #F5F0E8; letter-spacing: .5px;
    }
    .auth-app-name em { font-style: italic; color: #E8A598; }
    .auth-tagline {
      font-size: 11px; color: #6A7E94; letter-spacing: 2px;
      text-transform: uppercase; margin-top: 6px; font-weight: 600;
    }
    .auth-welcome {
      font-family: 'Playfair Display', serif;
      font-size: 22px; font-style: italic; color: #F5F0E8;
      margin-top: 32px; margin-bottom: 6px;
    }
    .auth-welcome em { color: #E8A598; }
    .auth-desc { font-size: 12px; color: #6A7E94; margin-bottom: 28px; text-align: center; line-height: 1.6; }

    .auth-card {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 20px;
      padding: 24px 20px;
      backdrop-filter: blur(10px);
    }
    .auth-field-wrap { position: relative; margin-bottom: 12px; }
    .auth-field-label { font-size: 10px; font-weight: 700; color: #8FA0B8; letter-spacing: .8px; text-transform: uppercase; margin-bottom: 5px; display: block; }
    .auth-field {
      width: 100%; background: rgba(255,255,255,0.07);
      border: 1.5px solid rgba(255,255,255,0.1); border-radius: 12px;
      padding: 13px 16px; font-size: 14px; color: #F5F0E8;
      font-family: 'Nunito', sans-serif; font-weight: 500; outline: none;
      transition: border-color .2s; letter-spacing: .3px;
    }
    .auth-field::placeholder { color: #4A5E74; }
    .auth-field:focus { border-color: rgba(232,165,152,.6); }
    .auth-btn {
      width: 100%; background: linear-gradient(135deg,#E8A598,#D4897A);
      border: none; border-radius: 12px; padding: 15px;
      font-size: 14px; font-weight: 800; color: white; cursor: pointer;
      font-family: 'Nunito', sans-serif; margin-top: 6px;
      letter-spacing: .5px; transition: opacity .2s;
    }
    .auth-btn:hover { opacity: .9; }
    .auth-switch { text-align: center; margin-top: 14px; font-size: 12px; color: #6A7E94; }
    .auth-switch button { background: none; border: none; color: #E8A598; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; font-size: 12px; }
    .auth-err { font-size: 11px; color: #E8A598; margin-bottom: 10px; font-weight: 600; padding: 8px 12px; background: rgba(232,165,152,.1); border-radius: 8px; }

    .auth-bottom {
      padding: 20px 28px 32px;
      border-top: 1px solid rgba(255,255,255,0.06);
      text-align: center;
    }
    .auth-bottom-tagline {
      font-size: 12px; color: #4A5E74; line-height: 1.7; margin-bottom: 16px;
    }
    .auth-bottom-tagline strong { color: #6A7E94; font-weight: 700; }
    .auth-sig {
      display: flex; align-items: center; justify-content: center; gap: 6px;
      font-size: 10px; color: #3A4E60; letter-spacing: .5px;
    }

    /* ── BOTTOM NAV ── */
    .bnav {
      background: white; border-top: 1px solid #EDE7DC;
      display: flex; flex-shrink: 0;
      box-shadow: 0 -4px 20px rgba(30,45,74,.07);
    }
    .bnav-btn {
      flex: 1; background: none; border: none; padding: 10px 4px 14px;
      cursor: pointer; display: flex; flex-direction: column;
      align-items: center; gap: 3px; font-family: 'Nunito', sans-serif;
      transition: color .2s; position: relative;
    }
    .bnav-dot {
      position: absolute; bottom: 7px; left: 50%; transform: translateX(-50%);
      width: 4px; height: 4px; border-radius: 50%; background: #E8A598;
      opacity: 0; transition: opacity .2s;
    }
    .bnav-btn.active .bnav-dot { opacity: 1; }
    .bnav-label { font-size: 9px; font-weight: 700; letter-spacing: .3px; }

    /* ── HEADER ── */
    .hdr {
      background: #1E2D4A; padding: 28px 20px 20px;
      position: relative; overflow: hidden; flex-shrink: 0;
    }
    .hdr-blob1 { position:absolute;top:-30px;right:-30px;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,#E8A598,transparent 70%);opacity:.15;pointer-events:none; }
    .hdr-blob2 { position:absolute;bottom:-20px;left:40px;width:70px;height:70px;border-radius:50%;background:radial-gradient(circle,#7ABFCC,transparent 70%);opacity:.18;pointer-events:none; }
    .hdr-top { display:flex;align-items:center;justify-content:space-between;margin-bottom:16px; }
    .hdr-greeting { font-family:'Playfair Display',serif;font-size:20px;font-weight:400;color:#F5F0E8;line-height:1.2; }
    .hdr-greeting em { font-style:italic;color:#E8A598; }
    .hdr-sub { font-size:10px;color:#8FA0B8;margin-top:2px;font-weight:500; }
    .hdr-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      border: 2px solid rgba(232,165,152,.4);
      background: #2A3D5E; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; flex-shrink: 0; position: relative;
    }
    .hdr-avatar img { width:100%;height:100%;object-fit:cover; }
    .prog-card {
      background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);
      border-radius:14px;padding:12px 14px;cursor:pointer;
    }
    .prog-label { font-size:10px;color:#8FA0B8;letter-spacing:.5px;text-transform:uppercase;margin-bottom:6px; }
    .prog-row { display:flex;gap:8px;align-items:center; }
    .prog-track { flex:1;height:5px;background:rgba(255,255,255,.1);border-radius:99px;overflow:hidden; }
    .prog-fill { height:100%;border-radius:99px;background:linear-gradient(90deg,#E8A598,#F2C4BB);transition:width .6s; }
    .prog-pct { font-size:12px;color:#E8A598;font-weight:700; }

    /* ── TABS ── */
    .tabs-wrap { background:white;border-bottom:1px solid #EDE7DC;flex-shrink:0;box-shadow:0 2px 10px rgba(30,45,74,.05); }
    .tabs-inner { display:flex; }
    .tab-btn { flex:1;background:none;border:none;padding:11px 2px 9px;cursor:pointer;position:relative;transition:color .2s;font-family:'Nunito',sans-serif; }
    .tab-icon-wrap { display:flex;justify-content:center;margin-bottom:2px; }
    .tab-label { font-size:10px;font-weight:700; }
    .tab-count { font-size:9px;margin-top:1px;opacity:.6; }
    .tab-bar { position:absolute;bottom:0;left:20%;width:60%;height:2px;border-radius:99px;transform:scaleX(0);transition:transform .3s; }
    .tab-btn.active .tab-bar { transform:scaleX(1); }

    /* ── CONTENT ── */
    .content { padding: 18px 16px 24px; }

    /* ── CARDS ── */
    .card {
      background:white;border-radius:16px;margin-bottom:10px;
      padding:12px 13px;border:1.5px solid #EDE7DC;
      box-shadow:0 2px 8px rgba(30,45,74,.04);
      transition:box-shadow .2s;position:relative;overflow:hidden;
    }
    .card:hover { box-shadow:0 4px 16px rgba(30,45,74,.08); }
    .card.done-card { opacity:.55; }
    .card-stripe { position:absolute;left:0;top:0;bottom:0;width:4px;border-radius:16px 0 0 16px; }

    /* ── TASKS ── */
    .task-row { display:flex;align-items:center;gap:10px;padding-left:6px; }
    .check-btn { width:27px;height:27px;border-radius:50%;border:2px solid #D8D0C6;background:none;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .2s; }
    .icon-box { width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
    .task-info { flex:1;min-width:0; }
    .task-name { font-size:13px;font-weight:700;color:#1E2D4A;line-height:1.3; }
    .task-name.done { text-decoration:line-through;color:#B0A898; }
    .task-meta { display:flex;align-items:center;gap:8px;margin-top:2px; }
    .meta-chip { display:flex;align-items:center;gap:2px;font-size:9px;color:#9AABBD;font-weight:600; }
    .task-btns { display:flex;gap:4px;flex-shrink:0; }
    .icon-btn { width:27px;height:27px;border-radius:8px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center; }

    /* ── FORMS ── */
    .edit-wrap { padding-left:6px; }
    .edit-row { display:flex;gap:8px;align-items:center;margin-bottom:8px; }
    .field { flex:1;border:1.5px solid #EDE7DC;border-radius:10px;padding:8px 11px;font-size:13px;font-family:'Nunito',sans-serif;outline:none;background:#FAFAF7;color:#1E2D4A;transition:border-color .2s;font-weight:600; }
    .field:focus { border-color:#7ABFCC; }
    .pick-btn { width:38px;height:38px;border-radius:10px;border:1.5px solid #EDE7DC;background:#FAFAF7;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center; }
    .save-btn { flex:1;border:none;border-radius:10px;padding:10px;font-size:13px;font-weight:700;font-family:'Nunito',sans-serif;cursor:pointer;color:white; }
    .cancel-btn { flex:1;border:1.5px solid #EDE7DC;border-radius:10px;padding:10px;font-size:13px;font-weight:600;font-family:'Nunito',sans-serif;background:white;color:#5A6B7E;cursor:pointer; }
    .check-label { display:flex;align-items:center;gap:4px;font-size:11px;color:#7A8EA0;cursor:pointer;font-weight:600; }
    .check-label input { accent-color:#7ABFCC; }
    .add-trigger { width:100%;border:2px dashed #D8D0C6;border-radius:14px;background:transparent;padding:12px;text-align:center;cursor:pointer;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;color:#9AABBD;transition:all .2s;margin-bottom:10px;display:flex;align-items:center;justify-content:center;gap:6px; }
    .add-trigger:hover { border-color:#7ABFCC;color:#7ABFCC;background:#F0F8FA; }
    .add-card { background:white;border:1.5px solid #EDE7DC;border-radius:16px;padding:15px;margin-bottom:10px; }
    .add-title { font-family:'Playfair Display',serif;font-size:14px;font-style:italic;color:#1E2D4A;margin-bottom:11px; }

    /* ── PICKER ── */
    .overlay { position:fixed;inset:0;background:rgba(30,45,74,.45);z-index:100;display:flex;align-items:flex-end;max-width:430px;margin:0 auto; }
    .sheet { background:#F5F0E8;width:100%;border-radius:22px 22px 0 0;padding:20px 18px 36px; }
    .sheet-handle { width:34px;height:4px;background:#D8D0C6;border-radius:99px;margin:0 auto 14px; }
    .sheet-title { font-family:'Playfair Display',serif;font-size:17px;font-style:italic;color:#1E2D4A;margin-bottom:13px; }
    .picker-grid { display:flex;flex-wrap:wrap;gap:7px; }
    .picker-item { width:50px;height:50px;border-radius:12px;border:2px solid #EDE7DC;background:white;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;transition:all .15s; }
    .picker-item:hover,.picker-item.sel { border-color:#7ABFCC;background:#EDF7F9; }
    .picker-item-lbl { font-size:7px;font-weight:700;color:#9AABBD;font-family:'Nunito',sans-serif; }

    /* ── PROFILE SHEET ── */
    .profile-overlay { position:fixed;inset:0;background:rgba(30,45,74,.5);z-index:200;display:flex;align-items:flex-end;max-width:430px;margin:0 auto; }
    .profile-sheet { background:#F5F0E8;width:100%;border-radius:22px 22px 0 0;padding:22px 20px 40px; }
    .profile-avatar-big { width:80px;height:80px;border-radius:50%;border:3px solid #E8A598;background:#EDE7DC;display:flex;align-items:center;justify-content:center;overflow:hidden;cursor:pointer;margin:0 auto 10px;position:relative; }
    .profile-avatar-big img { width:100%;height:100%;object-fit:cover; }
    .profile-avatar-edit { position:absolute;bottom:0;right:0;width:24px;height:24px;background:#E8A598;border-radius:50%;display:flex;align-items:center;justify-content:center; }
    .profile-name { font-family:'Playfair Display',serif;font-size:20px;text-align:center;color:#1E2D4A;margin-bottom:2px; }
    .profile-email { font-size:12px;color:#9AABBD;text-align:center;margin-bottom:20px; }

    /* ── FINANCE ── */
    .fin-summary { display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px; }
    .fin-box { background:white;border:1.5px solid #EDE7DC;border-radius:14px;padding:13px; }
    .fin-box-label { font-size:9px;color:#9AABBD;font-weight:700;letter-spacing:.5px;text-transform:uppercase; }
    .fin-box-value { font-family:'Playfair Display',serif;font-size:20px;margin-top:4px; }
    .fin-entry { display:flex;align-items:center;gap:10px;padding:11px 13px;background:white;border:1.5px solid #EDE7DC;border-radius:13px;margin-bottom:8px; }
    .fin-dot { width:9px;height:9px;border-radius:50%;flex-shrink:0; }
    .fin-info { flex:1;min-width:0; }
    .fin-name { font-size:13px;font-weight:700;color:#1E2D4A; }
    .fin-cat { font-size:10px;color:#9AABBD;font-weight:600; }
    .fin-amount { font-size:13px;font-weight:800; }

    /* ── DIARY ── */
    .diary-entry { background:white;border:1.5px solid #EDE7DC;border-radius:14px;padding:13px;margin-bottom:10px; }
    .diary-date { font-size:10px;color:#9AABBD;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px; }
    .diary-text { font-size:13px;color:#1E2D4A;line-height:1.6;white-space:pre-wrap; }
    .diary-textarea { width:100%;border:1.5px solid #EDE7DC;border-radius:12px;padding:13px;font-size:13px;font-family:'Nunito',sans-serif;color:#1E2D4A;background:#FAFAF7;outline:none;resize:none;font-weight:500;line-height:1.6;transition:border-color .2s; }
    .diary-textarea:focus { border-color:#A598D4; }

    /* ── SCHOOL ── */
    .school-card { background:white;border:1.5px solid #EDE7DC;border-radius:14px;padding:13px;margin-bottom:10px; }
    .school-day { font-family:'Playfair Display',serif;font-size:14px;font-style:italic;color:#1A5A6A;margin-bottom:9px; }
    .school-item { display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid #F0EAE2; }
    .school-item:last-child { border-bottom:none;padding-bottom:0; }
    .school-time { font-size:10px;color:#9AABBD;font-weight:700;min-width:36px; }
    .school-name { font-size:12px;font-weight:600;color:#1E2D4A;flex:1; }
    .school-tag { font-size:8px;font-weight:700;padding:2px 7px;border-radius:99px; }

    /* ── MEDICAL ── */
    .med-card { background:white;border:1.5px solid #EDE7DC;border-radius:14px;padding:13px;margin-bottom:10px;position:relative;overflow:hidden; }
    .med-type { font-size:9px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:3px; }
    .med-title { font-size:14px;font-weight:700;color:#1E2D4A; }
    .med-detail { font-size:11px;color:#7A8EA0;margin-top:2px; }
    .med-date { font-size:10px;color:#9AABBD;font-weight:600;margin-top:5px;display:flex;align-items:center;gap:3px; }

    /* ── SECTION TITLE ── */
    .screen-title { font-family:'Playfair Display',serif;font-size:21px;font-style:italic;color:#1E2D4A;margin-bottom:16px; }

    /* ── RESET ── */
    .reset-area { text-align:center;margin-top:14px; }
    .reset-btn { background:none;border:none;font-size:11px;color:#B8B0A6;cursor:pointer;font-family:'Nunito',sans-serif;padding:8px;font-weight:600;display:inline-flex;align-items:center;gap:4px; }
    .reset-btn:hover { color:#7A8EA0; }

    /* ── FOOTER ── */
    .footer-sig { padding:16px 0 4px;display:flex;align-items:center;justify-content:center;gap:5px;font-size:10px;color:#C0B8AE;letter-spacing:.4px; }

    /* ── EMPTY ── */
    .empty { text-align:center;padding:40px 0; }
    .empty-title { font-family:'Playfair Display',serif;font-size:17px;font-style:italic;color:#C0B8AE;margin-top:10px; }
    .empty-sub { font-size:11px;color:#C0B8AE;margin-top:4px;font-weight:600; }

    /* ── MISC ── */
    input[type="time"] { border:1.5px solid #EDE7DC;border-radius:9px;padding:7px 9px;font-size:12px;font-family:'Nunito',sans-serif;font-weight:600;outline:none;background:#FAFAF7;color:#1E2D4A; }
    input[type="time"]:focus { border-color:#7ABFCC; }
    select { border:1.5px solid #EDE7DC;border-radius:9px;padding:7px 9px;font-size:12px;font-family:'Nunito',sans-serif;font-weight:600;outline:none;background:#FAFAF7;color:#1E2D4A; }
    select:focus { border-color:#7ABFCC; }
  `}</style>
);

// ── SVG ICONS ─────────────────────────────────────────────────────
const SvgCheck  = ({c="white",s=12}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 5" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgEdit   = ({s=12}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M11 3L13 5L7 11H5V9L11 3Z" stroke="#9AABBD" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgTrash  = ({c="#E8A598",s=12}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3 5h10M6 5V4a1 1 0 011-1h2a1 1 0 011 1v1M13 5l-.9 8A1 1 0 0111.1 14H4.9A1 1 0 014 13L3 5" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgPlus   = ({c="#9AABBD",s=13}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>;
const SvgBell   = ({c="#7ABFCC",s=9}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M8 2a4.5 4.5 0 014.5 4.5V10l1 1.5H2.5L3.5 10V6.5A4.5 4.5 0 018 2z" stroke={c} strokeWidth="1.3" strokeLinecap="round"/><path d="M6.5 12a1.5 1.5 0 003 0" stroke={c} strokeWidth="1.3"/></svg>;
const SvgClock  = ({c="#9AABBD",s=9}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke={c} strokeWidth="1.3"/><path d="M8 5.5V8l2.5 2" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>;
const SvgReset  = ({s=11}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M2.5 8a5.5 5.5 0 101-3.5" stroke="#B8B0A6" strokeWidth="1.5" strokeLinecap="round"/><path d="M2.5 3.5V8h4.5" stroke="#B8B0A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgLogout = ({s=14}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" stroke="#E8A598" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgCamera = ({s=14}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none"><rect x="1" y="4" width="14" height="10" rx="2" stroke="white" strokeWidth="1.3"/><circle cx="8" cy="9" r="2.5" stroke="white" strokeWidth="1.3"/><path d="M5 4l1-2h4l1 2" stroke="white" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const SvgPerson = ({s=20,c="#7ABFCC"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill={c} opacity=".35" stroke={c} strokeWidth="1.4"/><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>;
const SvgSun    = ({c="#F5C97E",s=17}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" fill={c} opacity=".3" stroke={c} strokeWidth="1.5"/>{[0,45,90,135,180,225,270,315].map((d,i)=>{const a=d*Math.PI/180;return <line key={i} x1={12+6.5*Math.cos(a)} y1={12+6.5*Math.sin(a)} x2={12+8.5*Math.cos(a)} y2={12+8.5*Math.sin(a)} stroke={c} strokeWidth="1.5" strokeLinecap="round"/>;})}</svg>;
const SvgSunset = ({c="#7ABFCC",s=17}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 19a7 7 0 0114 0" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="19" x2="21" y2="19" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="3" x2="12" y2="7" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="5" y1="6" x2="7" y2="8" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="19" y1="6" x2="17" y2="8" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>;
const SvgMoon   = ({c="#A598D4",s=17}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M20 13.5A8 8 0 1110.5 4a6 6 0 009.5 9.5z" fill={c} opacity=".2" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><circle cx="17" cy="5" r="1" fill={c} opacity=".5"/><circle cx="20" cy="8" r=".7" fill={c} opacity=".4"/></svg>;

const NavHome    = ({c,s=20}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 12L12 4l9 8" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const NavFinance = ({c,s=20}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2.5" stroke={c} strokeWidth="1.6"/><path d="M2 10h20" stroke={c} strokeWidth="1.6"/><circle cx="8" cy="15" r="1.5" fill={c} opacity=".5"/></svg>;
const NavDiary   = ({c,s=20}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="14" height="18" rx="2" stroke={c} strokeWidth="1.6"/><path d="M8 8h8M8 12h8M8 16h5" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>;
const NavSchool  = ({c,s=20}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M4 13l8-6 8 6" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><rect x="6" y="13" width="12" height="8" rx="1" stroke={c} strokeWidth="1.6"/><rect x="9" y="16" width="6" height="5" rx=".5" stroke={c} strokeWidth="1.3"/></svg>;
const NavMedical = ({c,s=20}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M22 12A10 10 0 112 12a10 10 0 0120 0z" stroke={c} strokeWidth="1.6"/><path d="M12 8v8M8 12h8" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>;

// ── ACTIVITY ICONS ─────────────────────────────────────────────────
const ActivityIcon = ({type,size=22,period}) => {
  const pal={manha:{a:"#F5C97E",b:"#FDE8A8"},tarde:{a:"#7ABFCC",b:"#B8E4EA"},noite:{a:"#A598D4",b:"#D4CEEC"}}[period]||{a:"#7ABFCC",b:"#B8E4EA"};
  const {a,b}=pal;
  const m={
    meal:    <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="17" r="9" fill={b} opacity=".6"/><path d="M11 17a5 5 0 0110 0" stroke={a} strokeWidth="1.6" strokeLinecap="round"/><line x1="16" y1="8" x2="16" y2="12" stroke={a} strokeWidth="1.6" strokeLinecap="round"/><line x1="11" y1="17" x2="11" y2="22" stroke={a} strokeWidth="1.5" strokeLinecap="round"/><line x1="21" y1="17" x2="21" y2="22" stroke={a} strokeWidth="1.5" strokeLinecap="round"/><line x1="11" y1="22" x2="21" y2="22" stroke={a} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    hygiene: <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><rect x="10" y="9" width="12" height="16" rx="6" fill={b} opacity=".6" stroke={a} strokeWidth="1.6"/><path d="M12.5 15Q16 11.5 19.5 15" stroke={a} strokeWidth="1.3" strokeLinecap="round" fill="none"/><line x1="13" y1="7" x2="13" y2="10" stroke={a} strokeWidth="1.5" strokeLinecap="round"/><line x1="19" y1="7" x2="19" y2="10" stroke={a} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    medicine:<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><rect x="12" y="7" width="8" height="18" rx="4" fill={b} opacity=".6" stroke={a} strokeWidth="1.6"/><line x1="12" y1="16" x2="20" y2="16" stroke={a} strokeWidth="1.6"/><rect x="12" y="7" width="8" height="9" rx="4" fill={a} opacity=".3"/></svg>,
    therapy: <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="12" r="5" fill={b} opacity=".6" stroke={a} strokeWidth="1.6"/><path d="M9 25c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke={a} strokeWidth="1.6" strokeLinecap="round"/><circle cx="16" cy="12" r="2" fill={a} opacity=".4"/></svg>,
    sleep:   <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M22 16.5A8 8 0 1113.5 8a7 7 0 008.5 8.5z" fill={b} opacity=".6" stroke={a} strokeWidth="1.6" strokeLinecap="round"/><circle cx="21" cy="9" r="1.2" fill={a} opacity=".45"/><circle cx="24.5" cy="12" r=".9" fill={a} opacity=".35"/></svg>,
    walk:    <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="9" r="3" fill={b} opacity=".6" stroke={a} strokeWidth="1.6"/><path d="M16 12.5l-2.5 7 3.5 4M16 12.5l2.5 6-2.5 5" stroke={a} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    school:  <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M6 15l10-8 10 8" stroke={a} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><rect x="8" y="15" width="16" height="12" rx="1.5" fill={b} opacity=".6" stroke={a} strokeWidth="1.6"/><rect x="12" y="19" width="8" height="8" rx="1.2" stroke={a} strokeWidth="1.4"/></svg>,
    reading: <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><rect x="7" y="7" width="18" height="20" rx="2.5" fill={b} opacity=".5" stroke={a} strokeWidth="1.6"/><line x1="10" y1="12" x2="14" y2="12" stroke={a} strokeWidth="1.3" strokeLinecap="round"/><line x1="10" y1="15.5" x2="14" y2="15.5" stroke={a} strokeWidth="1.3" strokeLinecap="round"/><line x1="10" y1="19" x2="14" y2="19" stroke={a} strokeWidth="1.3" strokeLinecap="round"/></svg>,
    play:    <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><rect x="7" y="13" width="18" height="12" rx="5" fill={b} opacity=".6" stroke={a} strokeWidth="1.6"/><circle cx="12" cy="19" r="2" stroke={a} strokeWidth="1.4"/><circle cx="20" cy="19" r="2" stroke={a} strokeWidth="1.4"/><line x1="11" y1="9" x2="10" y2="13" stroke={a} strokeWidth="1.5" strokeLinecap="round"/><line x1="21" y1="9" x2="22" y2="13" stroke={a} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    bath:    <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M7 18h18v2.5A5 5 0 0120 25.5H12A5 5 0 017 20.5V18z" fill={b} opacity=".6" stroke={a} strokeWidth="1.6"/><path d="M9 18V11.5A2.5 2.5 0 0111.5 9H13a2.5 2.5 0 012.5 2.5" stroke={a} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    art:     <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="8" fill={b} opacity=".4"/><circle cx="12" cy="12" r="2.5" fill="#E8A598" opacity=".7"/><circle cx="20" cy="12" r="2.5" fill="#F5C97E" opacity=".7"/><circle cx="12" cy="20" r="2.5" fill="#7ABFCC" opacity=".7"/><circle cx="20" cy="20" r="2.5" fill="#A8D48A" opacity=".7"/><circle cx="16" cy="16" r="3" fill="white" stroke={a} strokeWidth="1.4"/></svg>,
    snack:   <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M11 14Q16 7.5 21 14L20 25H12L11 14Z" fill={b} opacity=".6" stroke={a} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 8.5Q16 6 18 8.5" stroke={a} strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>,
    default: <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="9" fill={b} opacity=".5" stroke={a} strokeWidth="1.6"/><path d="M16 11v5l3 3" stroke={a} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  };
  return m[type]||m.default;
};

// ── CONSTANTS ─────────────────────────────────────────────────────
const PERIODS=[
  {id:"manha",label:"Manhã", accent:"#F5C97E",light:"#FDF4E0",active:"#7A6030",TabIco:(s)=><SvgSun s={s}/>,PeriodIco:(c,s)=><SvgSun c={c} s={s}/>},
  {id:"tarde",label:"Tarde", accent:"#7ABFCC",light:"#EDF7F9",active:"#1A5A6A",TabIco:(s)=><SvgSunset s={s}/>,PeriodIco:(c,s)=><SvgSunset c={c} s={s}/>},
  {id:"noite",label:"Noite", accent:"#A598D4",light:"#F0EDF8",active:"#2A1A6A",TabIco:(s)=><SvgMoon s={s}/>,PeriodIco:(c,s)=><SvgMoon c={c} s={s}/>},
];
const ICON_OPTS=[{id:"meal",lbl:"Refeição"},{id:"hygiene",lbl:"Higiene"},{id:"medicine",lbl:"Medicação"},{id:"therapy",lbl:"Terapia"},{id:"sleep",lbl:"Dormir"},{id:"walk",lbl:"Passeio"},{id:"school",lbl:"Escola"},{id:"reading",lbl:"Leitura"},{id:"play",lbl:"Brincar"},{id:"bath",lbl:"Banho"},{id:"art",lbl:"Arte"},{id:"snack",lbl:"Lanche"},{id:"default",lbl:"Geral"}];
const FIN_CATS=["Terapia","Medicação","Escola","Alimentação","Transporte","Consulta","Outro"];
const MED_TYPES=["Consulta","Exame","Vacina","Medicamento","Terapia","Outro"];
const SCHOOL_DAYS=["Segunda","Terça","Quarta","Quinta","Sexta"];
const DEFAULT_TASKS={
  manha:[{id:1,text:"Acordar e higiene",icon:"hygiene",time:"07:00",reminder:false,done:false},{id:2,text:"Café da manhã",icon:"meal",time:"07:30",reminder:false,done:false},{id:3,text:"Medicação",icon:"medicine",time:"08:00",reminder:true,done:false},{id:4,text:"Pronto para a escola",icon:"school",time:"08:30",reminder:true,done:false}],
  tarde:[{id:5,text:"Almoço",icon:"meal",time:"12:00",reminder:false,done:false},{id:6,text:"Terapia ABA",icon:"therapy",time:"14:00",reminder:true,done:false},{id:7,text:"Lanche da tarde",icon:"snack",time:"15:30",reminder:false,done:false},{id:8,text:"Atividade livre",icon:"play",time:"16:00",reminder:false,done:false}],
  noite:[{id:9,text:"Jantar",icon:"meal",time:"18:30",reminder:false,done:false},{id:10,text:"Banho",icon:"bath",time:"19:30",reminder:false,done:false},{id:11,text:"Leitura",icon:"reading",time:"20:30",reminder:false,done:false},{id:12,text:"Hora de dormir",icon:"sleep",time:"21:00",reminder:true,done:false}],
};
const genId=()=>Date.now()+Math.random();
const today=()=>new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"long"});
const todayKey=()=>new Date().toISOString().slice(0,10);
function load(k,d){try{const s=localStorage.getItem(k);return s?JSON.parse(s):d;}catch{return d;}}
function persist(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}

// ── FOOTER SIG ────────────────────────────────────────────────────
const FooterSig = () => (
  <div className="footer-sig">
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#C0B8AE" strokeWidth="1.2"/><text x="7" y="10.5" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="7.5" fill="#C0B8AE">c</text></svg>
    <span>2026 Iara Teixeira</span>
  </div>
);

// ── AUTH ──────────────────────────────────────────────────────────
function AuthScreen({onAuth}){
  const [mode,setMode]=useState("login");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [err,setErr]=useState("");

  const handle=()=>{
    if(!email||!pw){setErr("Preencha todos os campos.");return;}
    if(mode==="register"){
      if(!name){setErr("Informe seu nome.");return;}
      persist("atipicos-user",{name,email,pw});
      onAuth({name,email});
    } else {
      const u=load("atipicos-user",null);
      if(u&&u.email===email&&u.pw===pw) onAuth(u);
      else setErr("E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-blob1"/><div className="auth-blob2"/>

      {/* Top — Logo + Form */}
      <div className="auth-top">
        <div className="auth-logo-circle">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M21 9C14 9 8.5 14.5 8.5 21.5S14 34 21 34s12.5-5.5 12.5-12.5" stroke="#E8A598" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="33.5" cy="9" r="3.5" fill="#E8A598" opacity=".7"/>
          </svg>
        </div>
        <div className="auth-app-name">Minha Rotina <em>Atípica</em></div>
        <div className="auth-tagline">Sua rotina. Nossa conexão.</div>

        <div className="auth-welcome">
          {mode==="login" ? <>Bem-vindo<em>(a)</em> de volta!</> : <>Criar minha <em>conta</em></>}
        </div>
        <div className="auth-desc">
          {mode==="login" ? "Entre para continuar organizando sua rotina." : "Comece a transformar sua rotina atípica hoje."}
        </div>

        <div className="auth-card">
          {mode==="register" && (
            <div className="auth-field-wrap">
              <label className="auth-field-label">Seu nome</label>
              <input className="auth-field" placeholder="Como prefere ser chamado(a)" value={name} onChange={e=>setName(e.target.value)}/>
            </div>
          )}
          <div className="auth-field-wrap">
            <label className="auth-field-label">E-mail</label>
            <input className="auth-field" placeholder="seu@email.com" type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}}/>
          </div>
          <div className="auth-field-wrap" style={{marginBottom:0}}>
            <label className="auth-field-label">Senha</label>
            <input className="auth-field" placeholder="••••••••" type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr("");}}/>
          </div>
          {err&&<div className="auth-err" style={{marginTop:10}}>{err}</div>}
          <button className="auth-btn" style={{marginTop:16}} onClick={handle}>
            {mode==="login"?"Entrar":"Cadastrar"}
          </button>
          <div className="auth-switch">
            {mode==="login"?"Ainda não tem conta? ":"Já tem conta? "}
            <button onClick={()=>{setMode(m=>m==="login"?"register":"login");setErr("");}}>
              {mode==="login"?"Cadastre-se gratuitamente":"Entrar"}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom — About + Signature */}
      <div className="auth-bottom">
        <div className="auth-bottom-tagline">
          <strong>Minha Rotina Atípica</strong> é um app criado com amor por uma <strong>mãe atípica</strong>, para organizar consultas, medicações, terapias, finanças e cada detalhe da jornada especial da sua família.
        </div>
        <div className="auth-sig">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#3A4E60" strokeWidth="1.2"/><text x="7" y="10.5" textAnchor="middle" fontFamily="serif" fontSize="7.5" fill="#3A4E60">c</text></svg>
          <span>2026 Iara Teixeira — Todos os direitos reservados</span>
        </div>
      </div>
    </div>
  );
}

// ── PROFILE SHEET ─────────────────────────────────────────────────
function ProfileSheet({user,onClose,onLogout,onPhotoChange,photo}){
  const fileRef=useRef();
  const handleFile=e=>{
    const f=e.target.files[0]; if(!f) return;
    const r=new FileReader();
    r.onload=ev=>{onPhotoChange(ev.target.result);};
    r.readAsDataURL(f);
  };
  return(
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-sheet" onClick={e=>e.stopPropagation()}>
        <div style={{width:34,height:4,background:"#D8D0C6",borderRadius:99,margin:"0 auto 18px"}}/>
        <div className="profile-avatar-big" onClick={()=>fileRef.current.click()}>
          {photo ? <img src={photo} alt="avatar"/> : <SvgPerson s={38} c="#C0B8AE"/>}
          <div className="profile-avatar-edit"><SvgCamera s={12}/></div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFile}/>
        <div style={{textAlign:"center",marginBottom:4}}>
          <div style={{fontSize:10,color:"#9AABBD",fontWeight:600,marginBottom:4}}>Toque na foto para alterar</div>
        </div>
        <div className="profile-name">{user.name||"Família Atípica"}</div>
        <div className="profile-email">{user.email}</div>
        <button onClick={onLogout} style={{width:"100%",background:"#FDF2F0",border:"1.5px solid #F2D4CC",borderRadius:12,padding:"12px",fontSize:13,fontWeight:700,color:"#C87A6A",cursor:"pointer",fontFamily:"'Nunito',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <SvgLogout s={14}/> Sair da conta
        </button>
        <FooterSig/>
      </div>
    </div>
  );
}

// ── ROUTINE ───────────────────────────────────────────────────────
function RoutineScreen({user,photo,onAvatarClick}){
  const [tasks,setTasks]=useState(()=>load("atipicos-tasks",DEFAULT_TASKS));
  const [tab,setTab]=useState("manha");
  const [editId,setEditId]=useState(null);
  const [editD,setEditD]=useState({});
  const [showAdd,setShowAdd]=useState(false);
  const [newTask,setNewTask]=useState({text:"",icon:"default",time:"",reminder:false});
  const [picker,setPicker]=useState(null);
  const [showProg,setShowProg]=useState(false);
  const [resetConfirm,setResetConfirm]=useState(false);

  useEffect(()=>persist("atipicos-tasks",tasks),[tasks]);

  const allT=Object.values(tasks).flat();
  const totalAll=allT.length, totalDone=allT.filter(t=>t.done).length;
  const progress=totalAll>0?Math.round(totalDone/totalAll*100):0;
  const period=PERIODS.find(p=>p.id===tab);
  const curList=tasks[tab]||[];

  const toggle=(pid,id)=>setTasks(p=>({...p,[pid]:p[pid].map(t=>t.id===id?{...t,done:!t.done}:t)}));
  const del=(pid,id)=>setTasks(p=>({...p,[pid]:p[pid].filter(t=>t.id!==id)}));
  const startEdit=t=>{setEditId(t.id);setEditD({text:t.text,icon:t.icon,time:t.time,reminder:t.reminder});};
  const saveEdit=()=>{setTasks(p=>({...p,[tab]:p[tab].map(t=>t.id===editId?{...t,...editD}:t)}));setEditId(null);};
  const addTask=()=>{if(!newTask.text.trim())return;setTasks(p=>({...p,[tab]:[...p[tab],{id:genId(),...newTask,done:false}]}));setNewTask({text:"",icon:"default",time:"",reminder:false});setShowAdd(false);};
  const resetDay=()=>{setTasks(p=>{const r={};Object.keys(p).forEach(k=>r[k]=p[k].map(t=>({...t,done:false})));return r;});setResetConfirm(false);};

  return(
    <>
      <header className="hdr">
        <div className="hdr-blob1"/><div className="hdr-blob2"/>
        <div className="hdr-top">
          <div>
            <div className="hdr-greeting">Olá, <em>{user.name||"família"}</em></div>
            <div className="hdr-sub">{today()}</div>
          </div>
          <div className="hdr-avatar" onClick={onAvatarClick}>
            {photo?<img src={photo} alt="avatar"/>:<SvgPerson s={20}/>}
          </div>
        </div>
        <div className="prog-card" onClick={()=>setShowProg(s=>!s)}>
          <div className="prog-label">Meta do dia</div>
          <div className="prog-row">
            <div className="prog-track"><div className="prog-fill" style={{width:`${progress}%`}}/></div>
            <div className="prog-pct">{totalDone}/{totalAll}</div>
          </div>
          {showProg&&(<div style={{display:"flex",marginTop:9}}>{PERIODS.map(p=>{const t=tasks[p.id]||[];const d=t.filter(x=>x.done).length;return(<div key={p.id} style={{flex:1,textAlign:"center"}}><div style={{display:"flex",justifyContent:"center",marginBottom:2}}>{p.PeriodIco(p.accent,13)}</div><div style={{fontSize:12,fontWeight:700,color:p.accent}}>{d}/{t.length}</div><div style={{fontSize:9,color:"#8FA0B8"}}>{p.label}</div></div>);})}</div>)}
        </div>
      </header>

      <div className="tabs-wrap">
        <div className="tabs-inner">
          {PERIODS.map(p=>{const isA=tab===p.id;const t=tasks[p.id]||[];const d=t.filter(x=>x.done).length;return(<button key={p.id} className={`tab-btn ${isA?"active":""}`} onClick={()=>{setTab(p.id);setShowAdd(false);setEditId(null);}} style={{color:isA?p.accent:"#9AABBD"}}><div className="tab-icon-wrap">{p.TabIco(15)}</div><div className="tab-label">{p.label}</div><div className="tab-count">{d}/{t.length}</div><div className="tab-bar" style={{background:p.accent}}/></button>);})}
        </div>
      </div>

      <div className="screen-scroll">
        <div className="content">
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontStyle:"italic",marginBottom:13,color:period.active,display:"flex",alignItems:"center",gap:8}}>
            {period.label}
            <span style={{fontSize:9,fontWeight:700,fontStyle:"normal",fontFamily:"'Nunito',sans-serif",padding:"2px 8px",borderRadius:99,background:period.light,color:period.active}}>{curList.filter(t=>t.done).length}/{curList.length}</span>
          </div>

          {curList.length===0&&<div className="empty"><ActivityIcon type="default" size={46} period={tab}/><div className="empty-title">Nenhuma atividade</div><div className="empty-sub">Adicione abaixo</div></div>}

          {curList.map(task=>(
            <div key={task.id} className={`card ${task.done?"done-card":""}`}>
              <div className="card-stripe" style={{background:task.done?"#E5DDD0":period.accent}}/>
              {editId===task.id?(
                <div className="edit-wrap">
                  <div className="edit-row"><button className="pick-btn" onClick={()=>setPicker(task.id)}><ActivityIcon type={editD.icon} size={20} period={tab}/></button><input className="field" value={editD.text} onChange={e=>setEditD(d=>({...d,text:e.target.value}))} autoFocus/></div>
                  <div className="edit-row" style={{marginBottom:9}}><div style={{display:"flex",alignItems:"center",gap:4}}><SvgClock s={10}/><input type="time" value={editD.time} onChange={e=>setEditD(d=>({...d,time:e.target.value}))}/></div><label className="check-label" style={{marginLeft:"auto"}}><input type="checkbox" checked={editD.reminder} onChange={e=>setEditD(d=>({...d,reminder:e.target.checked}))}/>Lembrete</label></div>
                  <div style={{display:"flex",gap:8}}><button className="save-btn" style={{background:period.accent}} onClick={saveEdit}>Salvar</button><button className="cancel-btn" onClick={()=>setEditId(null)}>Cancelar</button></div>
                </div>
              ):(
                <div className="task-row">
                  <button className="check-btn" style={task.done?{background:period.accent,borderColor:period.accent}:{}} onClick={()=>toggle(tab,task.id)}>{task.done&&<SvgCheck s={11}/>}</button>
                  <div className="icon-box" style={{background:period.light}}><ActivityIcon type={task.icon} size={20} period={tab}/></div>
                  <div className="task-info"><div className={`task-name ${task.done?"done":""}`}>{task.text}</div><div className="task-meta">{task.time&&<span className="meta-chip"><SvgClock s={8}/>{task.time}</span>}{task.reminder&&<span className="meta-chip" style={{color:period.accent}}><SvgBell c={period.accent} s={8}/>Lembrete</span>}</div></div>
                  <div className="task-btns"><button className="icon-btn" style={{background:"#F2EFE9"}} onClick={()=>startEdit(task)}><SvgEdit s={11}/></button><button className="icon-btn" style={{background:"#FDF2F0"}} onClick={()=>del(tab,task.id)}><SvgTrash s={11}/></button></div>
                </div>
              )}
            </div>
          ))}

          {showAdd?(
            <div className="add-card">
              <div className="add-title">Nova atividade</div>
              <div className="edit-row"><button className="pick-btn" onClick={()=>setPicker("new")}><ActivityIcon type={newTask.icon} size={20} period={tab}/></button><input className="field" placeholder="Nome da atividade..." value={newTask.text} onChange={e=>setNewTask(n=>({...n,text:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addTask()} autoFocus/></div>
              <div className="edit-row" style={{marginBottom:9}}><div style={{display:"flex",alignItems:"center",gap:4}}><SvgClock s={10}/><input type="time" value={newTask.time} onChange={e=>setNewTask(n=>({...n,time:e.target.value}))}/></div><label className="check-label" style={{marginLeft:"auto"}}><input type="checkbox" checked={newTask.reminder} onChange={e=>setNewTask(n=>({...n,reminder:e.target.checked}))}/>Lembrete</label></div>
              <div style={{display:"flex",gap:8}}><button className="save-btn" style={{background:period.accent}} onClick={addTask}>Adicionar</button><button className="cancel-btn" onClick={()=>setShowAdd(false)}>Cancelar</button></div>
            </div>
          ):(<button className="add-trigger" onClick={()=>setShowAdd(true)}><SvgPlus/>Adicionar atividade</button>)}

          <div className="reset-area">{resetConfirm?(<div style={{background:"#FDF5F2",border:"1px solid #F2D4CC",borderRadius:13,padding:"12px 15px"}}><div style={{fontSize:12,color:"#3A4D60",marginBottom:9,fontWeight:600}}>Desmarcar todas as atividades do dia?</div><div style={{display:"flex",gap:8}}><button style={{flex:1,background:"#C87A6A",color:"white",border:"none",borderRadius:9,padding:9,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}} onClick={resetDay}>Sim, novo dia</button><button style={{flex:1,background:"white",color:"#5A6B7E",border:"1px solid #EDE7DC",borderRadius:9,padding:9,fontSize:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}} onClick={()=>setResetConfirm(false)}>Cancelar</button></div></div>):(<button className="reset-btn" onClick={()=>setResetConfirm(true)}><SvgReset/>Novo dia — desmarcar tudo</button>)}</div>
          <FooterSig/>
        </div>
      </div>

      {picker!==null&&(<div className="overlay" onClick={()=>setPicker(null)}><div className="sheet" onClick={e=>e.stopPropagation()}><div className="sheet-handle"/><div className="sheet-title">Escolha uma ilustração</div><div className="picker-grid">{ICON_OPTS.map(opt=>{const cur=picker==="new"?newTask.icon:editD.icon;return(<button key={opt.id} className={`picker-item ${cur===opt.id?"sel":""}`} onClick={()=>{picker==="new"?setNewTask(n=>({...n,icon:opt.id})):setEditD(d=>({...d,icon:opt.id}));setPicker(null);}}><ActivityIcon type={opt.id} size={24} period={tab}/><span className="picker-item-lbl">{opt.lbl}</span></button>);})}</div></div></div>)}
    </>
  );
}

// ── FINANCE ───────────────────────────────────────────────────────
function FinanceScreen() {
  const [entries, setEntries] = useState(() => load("atipicos-fin", []));
  const [showAdd, setShowAdd] = useState(false);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [cat, setCat] = useState("Terapia");

  useEffect(() => persist("atipicos-fin", entries), [entries]);

  const income  = entries.filter(e => e.type === "income").reduce((s, e) => s + e.amount, 0);
  const expense = entries.filter(e => e.type === "expense").reduce((s, e) => s + e.amount, 0);
  const balance = income - expense;

  const fmt = v => "R$ " + v.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const handleAdd = () => {
    if (!desc.trim() || !amount) return;
    const entry = { id: genId(), desc: desc.trim(), amount: parseFloat(amount), type, cat, date: todayKey() };
    setEntries(prev => [entry, ...prev]);
    setDesc(""); setAmount(""); setType("expense"); setCat("Terapia");
    setShowAdd(false);
  };

  const [filter, setFilter] = useState("all"); // "all" | "income" | "expense"

  const handleDelete = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const filtered = filter === "all" ? entries : entries.filter(e => e.type === filter);

  const filterLabel = { all: "Todos", income: "Entradas", expense: "Saídas" };

  return (
    <div className="screen-scroll">
      <div className="content">
        <div className="screen-title">Controle <em style={{color:"#A8D48A"}}>Financeiro</em></div>

        {/* Summary cards — clicáveis para filtrar */}
        <div className="fin-summary">
          <div
            className="fin-box"
            onClick={() => setFilter(f => f === "income" ? "all" : "income")}
            style={{
              borderColor: "#C8E8B8",
              cursor: "pointer",
              outline: filter === "income" ? "2.5px solid #A8D48A" : "none",
              transition: "outline 0.15s",
            }}
          >
            <div className="fin-box-label" style={{color:"#5A8A4A"}}>
              Entradas {filter === "income" && "✓"}
            </div>
            <div className="fin-box-value" style={{color:"#5A8A4A"}}>{fmt(income)}</div>
          </div>
          <div
            className="fin-box"
            onClick={() => setFilter(f => f === "expense" ? "all" : "expense")}
            style={{
              borderColor: "#F2D4CC",
              cursor: "pointer",
              outline: filter === "expense" ? "2.5px solid #E8A598" : "none",
              transition: "outline 0.15s",
            }}
          >
            <div className="fin-box-label" style={{color:"#A05040"}}>
              Saídas {filter === "expense" && "✓"}
            </div>
            <div className="fin-box-value" style={{color:"#A05040"}}>{fmt(expense)}</div>
          </div>
        </div>

        <div
          className="fin-box"
          onClick={() => setFilter("all")}
          style={{
            marginBottom:16,
            borderColor: balance >= 0 ? "#C8E8B8" : "#F2D4CC",
            cursor: "pointer",
            outline: filter === "all" ? "2.5px solid #7ABFCC" : "none",
            transition: "outline 0.15s",
          }}
        >
          <div className="fin-box-label">
            Saldo atual {filter !== "all" && <span style={{color:"#9AABBD",fontWeight:500}}>— mostrando: {filterLabel[filter]}</span>}
          </div>
          <div className="fin-box-value" style={{color: balance >= 0 ? "#5A8A4A" : "#A05040"}}>{fmt(balance)}</div>
        </div>

        {/* Add Form */}
        {showAdd ? (
          <div className="add-card" style={{marginBottom:14}}>
            <div className="add-title">Novo lançamento</div>

            <input
              className="field"
              style={{width:"100%", marginBottom:10}}
              placeholder="Descrição (ex: Consulta neurológica)"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              autoFocus
            />

            <div style={{display:"flex", gap:8, marginBottom:10}}>
              <input
                className="field"
                placeholder="Valor (ex: 150.00)"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                style={{flex:1}}
              />
              <select value={type} onChange={e => setType(e.target.value)} style={{flexShrink:0}}>
                <option value="expense">Saída</option>
                <option value="income">Entrada</option>
              </select>
            </div>

            <select value={cat} onChange={e => setCat(e.target.value)} style={{width:"100%", marginBottom:14}}>
              {FIN_CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <div style={{display:"flex", gap:8}}>
              <button
                className="save-btn"
                style={{background:"#A8D48A"}}
                onClick={handleAdd}
              >
                Adicionar
              </button>
              <button
                className="cancel-btn"
                onClick={() => { setShowAdd(false); setDesc(""); setAmount(""); setType("expense"); setCat("Terapia"); }}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button className="add-trigger" style={{marginBottom:14}} onClick={() => setShowAdd(true)}>
            <SvgPlus /> Novo lançamento
          </button>
        )}

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="empty">
            <div className="empty-title">
              {filter === "all" ? "Nenhum lançamento" : `Nenhuma ${filterLabel[filter].toLowerCase()}`}
            </div>
            <div className="empty-sub">
              {filter === "all" ? "Adicione entradas e saídas acima" : "Toque em 'Saldo atual' para ver todos"}
            </div>
          </div>
        )}

        {filter !== "all" && filtered.length > 0 && (
          <div style={{fontSize:11,color:"#9AABBD",fontWeight:700,marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span>Mostrando: {filterLabel[filter]} ({filtered.length})</span>
            <button onClick={() => setFilter("all")} style={{background:"none",border:"none",color:"#E8A598",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>Ver todos</button>
          </div>
        )}

        {/* List */}
        {filtered.map(e => (
          <div key={e.id} className="fin-entry">
            <div className="fin-dot" style={{background: e.type === "income" ? "#A8D48A" : "#E8A598"}} />
            <div className="fin-info">
              <div className="fin-name">{e.desc}</div>
              <div className="fin-cat">{e.cat} · {e.date}</div>
            </div>
            <div className="fin-amount" style={{color: e.type === "income" ? "#5A8A4A" : "#A05040"}}>
              {e.type === "income" ? "+" : "-"}{fmt(e.amount)}
            </div>
            <button
              style={{background:"#FDF2F0", border:"1.5px solid #F2D4CC", borderRadius:8, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginLeft:4, flexShrink:0}}
              onClick={() => handleDelete(e.id)}
            >
              <SvgTrash c="#C87A6A" s={12} />
            </button>
          </div>
        ))}

        <FooterSig />
      </div>
    </div>
  );
}

// ── DIARY ─────────────────────────────────────────────────────────
function DiaryScreen(){
  const [entries,setEntries]=useState(()=>load("atipicos-diary",[]));
  const [text,setText]=useState("");
  useEffect(()=>persist("atipicos-diary",entries),[entries]);
  const saveEntry=()=>{if(!text.trim())return;setEntries(p=>[{id:genId(),text,date:new Date().toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"}),time:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})},...p]);setText("");};
  return(
    <div className="screen-scroll"><div className="content">
      <div className="screen-title">Meu <em style={{color:"#A598D4"}}>Diário</em></div>
      <div className="add-card" style={{marginBottom:14}}>
        <div style={{fontSize:10,color:"#9AABBD",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Escreva livremente</div>
        <textarea className="diary-textarea" rows={5} placeholder="Seus pensamentos, conquistas, desafios, gratidão..." value={text} onChange={e=>setText(e.target.value)}/>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:10}}>
          <button className="save-btn" style={{background:"#A598D4",flex:"none",padding:"9px 24px",borderRadius:10}} onClick={saveEntry}>Salvar</button>
        </div>
      </div>
      {entries.length===0&&<div className="empty"><div className="empty-title">Nenhum registro ainda</div><div className="empty-sub">Comece a escrever sua jornada</div></div>}
      {entries.map(e=>(<div key={e.id} className="diary-entry"><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}><div className="diary-date">{e.date} · {e.time}</div><button style={{background:"none",border:"none",cursor:"pointer",opacity:.4}} onClick={()=>setEntries(p=>p.filter(x=>x.id!==e.id))}><SvgTrash c="#C0B8AE" s={10}/></button></div><div className="diary-text">{e.text}</div></div>))}
      <FooterSig/>
    </div></div>
  );
}

// ── SCHOOL ────────────────────────────────────────────────────────
function SchoolScreen(){
  const [schedule,setSchedule]=useState(()=>load("atipicos-school",{Segunda:[{id:1,time:"08:00",name:"Matemática",tag:"matéria"},{id:2,time:"09:00",name:"Terapia Fonoaudiológica",tag:"terapia"},{id:3,time:"14:00",name:"Ed. Física Adaptada",tag:"atividade"}],Terça:[{id:4,time:"08:00",name:"Português",tag:"matéria"},{id:5,time:"10:00",name:"Terapia Ocupacional",tag:"terapia"}],Quarta:[{id:6,time:"08:00",name:"Ciências",tag:"matéria"},{id:7,time:"09:30",name:"Terapia ABA",tag:"terapia"}],Quinta:[{id:8,time:"08:00",name:"História",tag:"matéria"},{id:9,time:"14:00",name:"Natação Terapêutica",tag:"atividade"}],Sexta:[{id:10,time:"08:00",name:"Artes",tag:"matéria"},{id:11,time:"10:00",name:"Psicólogo",tag:"terapia"}]}));
  const [activeDay,setActiveDay]=useState("Segunda");
  const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState({time:"",name:"",tag:"matéria"});
  useEffect(()=>persist("atipicos-school",schedule),[schedule]);
  const tagColors={"matéria":{bg:"#EDF7F9",c:"#1A5A6A"},"terapia":{bg:"#F0EDF8",c:"#4A2A6A"},"atividade":{bg:"#FDF4E0",c:"#7A6030"},"outro":{bg:"#F5F0E8",c:"#5A4A3A"}};
  const addItem=()=>{if(!form.name||!form.time)return;setSchedule(p=>({...p,[activeDay]:[...(p[activeDay]||[]),{id:genId(),...form}].sort((a,b)=>a.time.localeCompare(b.time))}));setForm({time:"",name:"",tag:"matéria"});setShowAdd(false);};
  return(
    <div className="screen-scroll"><div className="content">
      <div className="screen-title">Rotina <em style={{color:"#7ABFCC"}}>Escolar</em></div>
      <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
        {SCHOOL_DAYS.map(d=>(<button key={d} onClick={()=>{setActiveDay(d);setShowAdd(false);}} style={{flexShrink:0,border:"1.5px solid",borderColor:activeDay===d?"#7ABFCC":"#EDE7DC",borderRadius:9,padding:"5px 13px",fontSize:11,fontWeight:700,cursor:"pointer",background:activeDay===d?"#EDF7F9":"white",color:activeDay===d?"#1A5A6A":"#9AABBD",transition:"all .2s"}}>{d}</button>))}
      </div>
      <div className="school-card"><div className="school-day">{activeDay}</div>
        {(schedule[activeDay]||[]).length===0&&<div style={{fontSize:11,color:"#C0B8AE",fontWeight:600,textAlign:"center",padding:"12px 0"}}>Nenhum item</div>}
        {(schedule[activeDay]||[]).map(item=>{const tc=tagColors[item.tag]||tagColors.outro;return(<div key={item.id} className="school-item"><div className="school-time">{item.time}</div><div className="school-name">{item.name}</div><span className="school-tag" style={{background:tc.bg,color:tc.c}}>{item.tag}</span><button style={{background:"none",border:"none",cursor:"pointer",marginLeft:4,opacity:.4}} onClick={()=>setSchedule(p=>({...p,[activeDay]:p[activeDay].filter(x=>x.id!==item.id)}))}><SvgTrash c="#C0B8AE" s={10}/></button></div>);})}
      </div>
      {showAdd?(<div className="add-card"><div className="add-title">Novo item — {activeDay}</div><div style={{display:"flex",alignItems:"center",gap:4,marginBottom:8}}><SvgClock s={10}/><input type="time" value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))}/></div><input className="field" style={{width:"100%",marginBottom:8}} placeholder="Nome (ex: Terapia Fonoaudiológica)" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} autoFocus/><select value={form.tag} onChange={e=>setForm(f=>({...f,tag:e.target.value}))} style={{width:"100%",marginBottom:11}}><option value="matéria">Matéria</option><option value="terapia">Terapia</option><option value="atividade">Atividade</option><option value="outro">Outro</option></select><div style={{display:"flex",gap:8}}><button className="save-btn" style={{background:"#7ABFCC"}} onClick={addItem}>Adicionar</button><button className="cancel-btn" onClick={()=>setShowAdd(false)}>Cancelar</button></div></div>):(<button className="add-trigger" onClick={()=>setShowAdd(true)}><SvgPlus/>Adicionar à {activeDay}</button>)}
      <FooterSig/>
    </div></div>
  );
}

// ── MEDICAL ───────────────────────────────────────────────────────
function MedicalScreen(){
  const [records,setRecords]=useState(()=>load("atipicos-med",[{id:1,type:"Consulta",title:"Neuropediatra",detail:"Dr. Marcos Silva — CRM 12345",date:"2026-08-15",notes:"Revisar dose de medicação"},{id:2,type:"Medicamento",title:"Risperidona 1mg",detail:"2 comprimidos à noite",date:"Diário",notes:""},{id:3,type:"Terapia",title:"Terapia ABA",detail:"Instituto Conexão — Ter e Qui",date:"Semanal",notes:"Trabalhar comunicação funcional"}]));
  const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState({type:"Consulta",title:"",detail:"",date:"",notes:""});
  useEffect(()=>persist("atipicos-med",records),[records]);
  const typeColors={"Consulta":"#7ABFCC","Exame":"#F5C97E","Vacina":"#A8D48A","Medicamento":"#E8A598","Terapia":"#A598D4","Outro":"#C0B8AE"};
  const addRecord=()=>{if(!form.title)return;setRecords(p=>[{id:genId(),...form},...p]);setForm({type:"Consulta",title:"",detail:"",date:"",notes:""});setShowAdd(false);};
  return(
    <div className="screen-scroll"><div className="content">
      <div className="screen-title">Histórico <em style={{color:"#E8A598"}}>Médico</em></div>
      {showAdd?(<div className="add-card" style={{marginBottom:12}}><div className="add-title">Novo registro</div><select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} style={{width:"100%",marginBottom:8}}>{MED_TYPES.map(t=><option key={t}>{t}</option>)}</select><input className="field" style={{width:"100%",marginBottom:8}} placeholder="Título (ex: Neuropediatra)" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} autoFocus/><input className="field" style={{width:"100%",marginBottom:8}} placeholder="Detalhes (médico, dose, local...)" value={form.detail} onChange={e=>setForm(f=>({...f,detail:e.target.value}))}/><input className="field" style={{width:"100%",marginBottom:8}} placeholder="Data ou frequência" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/><textarea className="diary-textarea" rows={2} style={{marginBottom:10}} placeholder="Notas adicionais..." value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/><div style={{display:"flex",gap:8}}><button className="save-btn" style={{background:"#E8A598"}} onClick={addRecord}>Adicionar</button><button className="cancel-btn" onClick={()=>setShowAdd(false)}>Cancelar</button></div></div>):(<button className="add-trigger" style={{marginBottom:12}} onClick={()=>setShowAdd(true)}><SvgPlus/>Novo registro médico</button>)}
      {records.length===0&&<div className="empty"><div className="empty-title">Nenhum registro</div><div className="empty-sub">Adicione consultas e medicamentos</div></div>}
      {records.map(r=>(<div key={r.id} className="med-card"><div className="card-stripe" style={{background:typeColors[r.type]||"#C0B8AE"}}/><div style={{paddingLeft:6,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div style={{flex:1}}><div className="med-type" style={{color:typeColors[r.type]||"#9AABBD"}}>{r.type}</div><div className="med-title">{r.title}</div>{r.detail&&<div className="med-detail">{r.detail}</div>}{r.date&&<div className="med-date"><SvgClock s={9}/>{r.date}</div>}{r.notes&&<div style={{fontSize:10,color:"#9AABBD",marginTop:5,fontStyle:"italic"}}>"{r.notes}"</div>}</div><button style={{background:"none",border:"none",cursor:"pointer",opacity:.4,marginLeft:8}} onClick={()=>setRecords(p=>p.filter(x=>x.id!==r.id))}><SvgTrash c="#C0B8AE" s={11}/></button></div></div>))}
      <FooterSig/>
    </div></div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────
export default function App(){
  const [user,setUser]=useState(()=>load("atipicos-session",null));
  const [page,setPage]=useState("routine");
  const [showProfile,setShowProfile]=useState(false);
  const [photo,setPhoto]=useState(()=>load("atipicos-photo",null));

  const handleAuth=u=>{persist("atipicos-session",u);setUser(u);};
  const handleLogout=()=>{persist("atipicos-session",null);setUser(null);setShowProfile(false);};
  const handlePhoto=p=>{setPhoto(p);persist("atipicos-photo",p);};

  if(!user) return(<><Styles/><AuthScreen onAuth={handleAuth}/></>);

  const navItems=[
    {id:"routine", label:"Rotina",   Icon:NavHome},
    {id:"finance", label:"Finanças", Icon:NavFinance},
    {id:"diary",   label:"Diário",   Icon:NavDiary},
    {id:"school",  label:"Escola",   Icon:NavSchool},
    {id:"medical", label:"Saúde",    Icon:NavMedical},
  ];

  const SmallHeader=()=>(
    <header className="hdr" style={{paddingBottom:16}}>
      <div className="hdr-blob1"/><div className="hdr-blob2"/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:9,color:"#8FA0B8",letterSpacing:2,textTransform:"uppercase",fontWeight:600,marginBottom:2}}>Minha Rotina Atípica</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:"#F5F0E8"}}>Olá, <em style={{fontStyle:"italic",color:"#E8A598"}}>{user.name||"família"}</em></div>
        </div>
        <div className="hdr-avatar" onClick={()=>setShowProfile(true)}>
          {photo?<img src={photo} alt="avatar"/>:<SvgPerson s={18}/>}
        </div>
      </div>
    </header>
  );

  return(
    <>
      <Styles/>
      <div className="app">
        {page==="routine"&&<RoutineScreen user={user} photo={photo} onAvatarClick={()=>setShowProfile(true)}/>}
        {page!=="routine"&&(
          <>
            <SmallHeader/>
            {page==="finance"&&<FinanceScreen/>}
            {page==="diary"&&<DiaryScreen/>}
            {page==="school"&&<SchoolScreen/>}
            {page==="medical"&&<MedicalScreen/>}
          </>
        )}

        <nav className="bnav">
          {navItems.map(n=>{const isA=page===n.id;const c=isA?"#E8A598":"#B8C8D8";return(
            <button key={n.id} className={`bnav-btn ${isA?"active":""}`} onClick={()=>setPage(n.id)} style={{color:c}}>
              <n.Icon c={c} s={19}/>
              <span className="bnav-label">{n.label}</span>
              <div className="bnav-dot"/>
            </button>
          );})}
        </nav>

        {showProfile&&<ProfileSheet user={user} photo={photo} onClose={()=>setShowProfile(false)} onLogout={handleLogout} onPhotoChange={handlePhoto}/>}
      </div>
    </>
  );
}
