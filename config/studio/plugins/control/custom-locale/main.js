"use strict";

(function () {
  var React = CrafterCMSNext.React;
  var ReactDOM = CrafterCMSNext.ReactDOM;
  var CrafterCMSNextBridge = CrafterCMSNext.components.CrafterCMSNextBridge;
  var ConfirmDialog = CrafterCMSNext.components.ConfirmDialog;

  function CustomLocale(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [locale, setLocale] = React.useState(props.locale);

    const generateUUID = e => {
      setIsOpen(true);
    };

    const onConfirmOk = e => {
      e.preventDefault();
      const newUUID = props.updateUUID();
      setLocale({
        localeCode: locale.localeCode,
        localeSourceId: newUUID
      });
      setIsOpen(false);
    };

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      class: "container input-control cstudio-form-field-container",
      id: "localeCode"
    }, /*#__PURE__*/React.createElement("span", {
      class: "cstudio-form-field-title"
    }, "Locale Code"), /*#__PURE__*/React.createElement("div", {
      class: "cstudio-form-control-input-container"
    }, /*#__PURE__*/React.createElement("span", {
      class: "validation-hint cstudio-form-control-validation fa"
    }), /*#__PURE__*/React.createElement("input", {
      class: "datum cstudio-form-control-input",
      size: "50",
      disabled: "disabled",
      value: locale.localeCode
    }), /*#__PURE__*/React.createElement("div", {
      class: "char-count cstudio-form-control-input-count"
    }, locale.localeCode.length, " / 50"), /*#__PURE__*/React.createElement("div", {
      class: "cstudio-form-control-input-url-err"
    }, "The value entered is not allowed in this field.")), /*#__PURE__*/React.createElement("span", {
      class: "description cstudio-form-field-description"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      class: "container input-control cstudio-form-field-container",
      id: "localeCode"
    }, /*#__PURE__*/React.createElement("span", {
      class: "cstudio-form-field-title"
    }, "Locale Source ID"), /*#__PURE__*/React.createElement("div", {
      class: "cstudio-form-control-input-container"
    }, /*#__PURE__*/React.createElement("span", {
      class: "validation-hint cstudio-form-control-validation fa"
    }), /*#__PURE__*/React.createElement("input", {
      class: "datum cstudio-form-control-input",
      size: "50",
      disabled: "disabled",
      value: locale.localeSourceId
    }), /*#__PURE__*/React.createElement("div", {
      class: "char-count cstudio-form-control-input-count"
    }, locale.localeSourceId.length, " / 50"), /*#__PURE__*/React.createElement("div", {
      class: "cstudio-form-control-input-url-err"
    }, "The value entered is not allowed in this field.")), /*#__PURE__*/React.createElement("span", {
      class: "description cstudio-form-field-description"
    }))), /*#__PURE__*/React.createElement("button", {
      style: {
        float: 'right'
      },
      onClick: generateUUID
    }, "Generate new UUID"), /*#__PURE__*/React.createElement(CrafterCMSNextBridge, null, /*#__PURE__*/React.createElement(ConfirmDialog, {
      open: isOpen,
      onOk: onConfirmOk,
      onCancel: () => {
        setIsOpen(false);
      },
      onClose: () => {
        setIsOpen(false);
      },
      description: "Warning: By assigning a new ID to this content you are indicating that this object has no localization relationships to any other objects in the system. Do you wish to continue?",
      title: "Generate UUID Warning",
      disableEnforceFocus: false
    })));
  }

  CStudioForms.Controls.CustomLocale = CStudioForms.Controls.CustomLocale || function (id, form, owner, properties, constraints) {
    this.owner = owner;
    this.owner.registerField(this);
    this.errors = [];
    this.properties = properties;
    this.constraints = constraints;
    this.inputEl = null;
    this.countEl = null;
    this.required = false;
    this.value = '_not-set';
    this.form = form;
    this.id = id;
    this.supportedPostFixes = ['_s'];
    return this;
  };

  YAHOO.extend(CStudioForms.Controls.CustomLocale, CStudioForms.CStudioFormField, {
    getLabel: function () {
      return 'Custom Locale Control';
    },
    // Source: http://site.icu-project.org/download
    _getLocaleList: function () {
      return ['af_na', 'af', 'af_za', 'agq_cm', 'agq', 'ak_gh', 'ak', 'am_et', 'am', 'ar_001', 'ar_ae', 'ar_bh', 'ar_dj', 'ar_dz', 'ar_eg', 'ar_eh', 'ar_er', 'ar_il', 'ar_iq', 'ar_jo', 'ar_km', 'ar_kw', 'ar_lb', 'ar_ly', 'ar_ma', 'ar_mr', 'ar_om', 'ar_ps', 'ar_qa', 'ar_sa', 'ar_sd', 'ar_so', 'ar_ss', 'ars', 'ar_sy', 'ar_td', 'ar_tn', 'ar', 'ar_ye', 'asa', 'asa_tz', 'as_in', 'ast_es', 'ast', 'as', 'az_az', 'az_cyrl_az', 'az_cyrl', 'az_latn_az', 'az_latn', 'az', 'bas_cm', 'bas', 'be_by', 'bem', 'bem_zm', 'be', 'bez', 'bez_tz', 'bg_bg', 'bg', 'bm_ml', 'bm', 'bn_bd', 'bn_in', 'bn', 'bo_cn', 'bo_in', 'bo', 'br_fr', 'br', 'brx_in', 'brx', 'bs_ba', 'bs_cyrl_ba', 'bs_cyrl', 'bs_latn_ba', 'bs_latn', 'bs', 'ca_ad', 'ca_es', 'ca_fr', 'ca_it', 'ca', 'ccp_bd', 'ccp_in', 'ccp', 'ceb_ph', 'ceb', 'ce_ru', 'ce', 'cgg', 'cgg_ug', 'chr', 'chr_us', 'ckb_iq', 'ckb_ir', 'ckb', 'cs_cz', 'cs', 'cy_gb', 'cy', 'da_dk', 'da_gl', 'da', 'dav_ke', 'dav', 'de_at', 'de_be', 'de_ch', 'de_de', 'de_it', 'de_li', 'de_lu', 'de', 'dje_ne', 'dje', 'doi_in', 'doi', 'dsb_de', 'dsb', 'dua_cm', 'dua', 'dyo_sn', 'dyo', 'dz_bt', 'dz', 'ebu_ke', 'ebu', 'ee_gh', 'ee_tg', 'ee', 'el_cy', 'el_gr', 'el', 'en_001', 'en_150', 'en_ae', 'en_ag', 'en_ai', 'en_as', 'en_at', 'en_au', 'en_bb', 'en_be', 'en_bi', 'en_bm', 'en_bs', 'en_bw', 'en_bz', 'en_ca', 'en_cc', 'en_ch', 'en_ck', 'en_cm', 'en_cx', 'en_cy', 'en_de', 'en_dg', 'en_dk', 'en_dm', 'en_er', 'en_fi', 'en_fj', 'en_fk', 'en_fm', 'en_gb', 'en_gd', 'en_gg', 'en_gh', 'en_gi', 'en_gm', 'en_gu', 'en_gy', 'en_hk', 'en_ie', 'en_il', 'en_im', 'en_in', 'en_io', 'en_je', 'en_jm', 'en_ke', 'en_ki', 'en_kn', 'en_ky', 'en_lc', 'en_lr', 'en_ls', 'en_mg', 'en_mh', 'en_mo', 'en_mp', 'en_ms', 'en_mt', 'en_mu', 'en_mw', 'en_my', 'en_na', 'en_nf', 'en_ng', 'en_nh', 'en_nl', 'en_nr', 'en_nu', 'en_nz', 'en_pg', 'en_ph', 'en_pk', 'en_pn', 'en_pr', 'en_pw', 'en_rh', 'en_rw', 'en_sb', 'en_sc', 'en_sd', 'en_se', 'en_sg', 'en_sh', 'en_si', 'en_sl', 'en_ss', 'en_sx', 'en_sz', 'en_tc', 'en_tk', 'en_to', 'en_tt', 'en_tv', 'en', 'en_tz', 'en_ug', 'en_um', 'en_us_posix', 'en_us', 'en_vc', 'en_vg', 'en_vi', 'en_vu', 'en_ws', 'en_za', 'en_zm', 'en_zw', 'eo_001', 'eo', 'es_419', 'es_ar', 'es_bo', 'es_br', 'es_bz', 'es_cl', 'es_co', 'es_cr', 'es_cu', 'es_do', 'es_ea', 'es_ec', 'es_es', 'es_gq', 'es_gt', 'es_hn', 'es_ic', 'es_mx', 'es_ni', 'es_pa', 'es_pe', 'es_ph', 'es_pr', 'es_py', 'es_sv', 'es', 'es_us', 'es_uy', 'es_ve', 'et_ee', 'et', 'eu_es', 'eu', 'ewo_cm', 'ewo', 'fa_af', 'fa_ir', 'fa', 'ff_adlm_bf', 'ff_adlm_cm', 'ff_adlm_gh', 'ff_adlm_gm', 'ff_adlm_gn', 'ff_adlm_gw', 'ff_adlm_lr', 'ff_adlm_mr', 'ff_adlm_ne', 'ff_adlm_ng', 'ff_adlm_sl', 'ff_adlm_sn', 'ff_adlm', 'ff_cm', 'ff_gn', 'ff_latn_bf', 'ff_latn_cm', 'ff_latn_gh', 'ff_latn_gm', 'ff_latn_gn', 'ff_latn_gw', 'ff_latn_lr', 'ff_latn_mr', 'ff_latn_ne', 'ff_latn_ng', 'ff_latn_sl', 'ff_latn_sn', 'ff_latn', 'ff_mr', 'ff_sn', 'ff', 'fi_fi', 'fil_ph', 'fil', 'fi', 'fo_dk', 'fo_fo', 'fo', 'fr_be', 'fr_bf', 'fr_bi', 'fr_bj', 'fr_bl', 'fr_ca', 'fr_cd', 'fr_cf', 'fr_cg', 'fr_ch', 'fr_ci', 'fr_cm', 'fr_dj', 'fr_dz', 'fr_fr', 'fr_ga', 'fr_gf', 'fr_gn', 'fr_gp', 'fr_gq', 'fr_ht', 'fr_km', 'fr_lu', 'fr_ma', 'fr_mc', 'fr_mf', 'fr_mg', 'fr_ml', 'fr_mq', 'fr_mr', 'fr_mu', 'fr_nc', 'fr_ne', 'fr_pf', 'fr_pm', 'fr_re', 'fr_rw', 'fr_sc', 'fr_sn', 'fr_sy', 'fr_td', 'fr_tg', 'fr_tn', 'fr', 'fr_vu', 'fr_wf', 'fr_yt', 'fur_it', 'fur', 'fy_nl', 'fy', 'ga_gb', 'ga_ie', 'ga', 'gd_gb', 'gd', 'gl_es', 'gl', 'gsw_ch', 'gsw_fr', 'gsw_li', 'gsw', 'gu_in', 'gu', 'guz_ke', 'guz', 'gv_im', 'gv', 'ha_gh', 'ha_ne', 'ha_ng', 'ha', 'haw', 'haw_us', 'he_il', 'he', 'hi_in', 'hi', 'hr_ba', 'hr_hr', 'hr', 'hsb_de', 'hsb', 'hu_hu', 'hu', 'hy_am', 'hy', 'ia_001', 'ia', 'id_id', 'id', 'ig_ng', 'ig', 'ii_cn', 'ii', 'in_id', 'in', 'is_is', 'is', 'it_ch', 'it_it', 'it_sm', 'it', 'it_va', 'iw_il', 'iw', 'ja_jp_traditional', 'ja_jp', 'ja', 'jgo_cm', 'jgo', 'jmc', 'jmc_tz', 'jv_id', 'jv', 'kab_dz', 'kab', 'ka_ge', 'kam_ke', 'kam', 'ka', 'kde', 'kde_tz', 'kea_cv', 'kea', 'khq_ml', 'khq', 'ki_ke', 'ki', 'kkj_cm', 'kkj', 'kk_kz', 'kk', 'kl_gl', 'kln_ke', 'kln', 'kl', 'km_kh', 'km', 'kn_in', 'kn', 'kok_in', 'ko_kp', 'ko_kr', 'kok', 'ko', 'ks_arab_in', 'ks_arab', 'ksb', 'ksb_tz', 'ksf_cm', 'ksf', 'ksh_de', 'ksh', 'ks_in', 'ks', 'ku_tr', 'ku', 'kw_gb', 'kw', 'ky_kg', 'ky', 'lag', 'lag_tz', 'lb_lu', 'lb', 'lg', 'lg_ug', 'lkt', 'lkt_us', 'ln_ao', 'ln_cd', 'ln_cf', 'ln_cg', 'ln', 'lo_la', 'lo', 'lrc_iq', 'lrc_ir', 'lrc', 'lt_lt', 'lt', 'lu_cd', 'luo_ke', 'luo', 'lu', 'luy_ke', 'luy', 'lv_lv', 'lv', 'mai_in', 'mai', 'mas_ke', 'mas', 'mas_tz', 'mer_ke', 'mer', 'mfe_mu', 'mfe', 'mgh_mz', 'mgh', 'mg_mg', 'mgo_cm', 'mgo', 'mg', 'mi_nz', 'mi', 'mk_mk', 'mk', 'ml_in', 'ml', 'mni_beng_in', 'mni_beng', 'mni_in', 'mni', 'mn_mn', 'mn', 'mo', 'mr_in', 'mr', 'ms_bn', 'ms_id', 'ms_my', 'ms_sg', 'ms', 'mt_mt', 'mt', 'mua_cm', 'mua', 'my_mm', 'my', 'mzn_ir', 'mzn', 'naq_na', 'naq', 'nb_no', 'nb_sj', 'nb', 'nd', 'nd_zw', 'ne_in', 'ne_np', 'ne', 'nl_aw', 'nl_be', 'nl_bq', 'nl_cw', 'nl_nl', 'nl_sr', 'nl_sx', 'nl', 'nmg_cm', 'nmg', 'nnh_cm', 'nnh', 'nn_no', 'nn', 'no_no_ny', 'no_no', 'no', 'nus_ss', 'nus', 'nyn', 'nyn_ug', 'om_et', 'om_ke', 'om', 'or_in', 'or', 'os_ge', 'os_ru', 'os', 'pa_arab_pk', 'pa_arab', 'pa_guru_in', 'pa_guru', 'pa_in', 'pa_pk', 'pa', 'pcm_ng', 'pcm', 'pl_pl', 'pl', 'ps_af', 'ps_pk', 'ps', 'pt_ao', 'pt_br', 'pt_ch', 'pt_cv', 'pt_gq', 'pt_gw', 'pt_lu', 'pt_mo', 'pt_mz', 'pt_pt', 'pt_st', 'pt_tl', 'pt', 'qu_bo', 'qu_ec', 'qu_pe', 'qu', 'rm_ch', 'rm', 'rn_bi', 'rn', 'rof', 'rof_tz', 'ro_md', 'root', 'ro_ro', 'ro', 'ru_by', 'ru_kg', 'ru_kz', 'ru_md', 'ru_ru', 'ru', 'ru_ua', 'rwk', 'rwk_tz', 'rw_rw', 'rw', 'sah_ru', 'sah', 'sa_in', 'saq_ke', 'saq', 'sat_in', 'sat_olck_in', 'sat_olck', 'sat', 'sa', 'sbp', 'sbp_tz', 'sd_arab_pk', 'sd_arab', 'sd_deva_in', 'sd_deva', 'sd_pk', 'sd', 'se_fi', 'seh_mz', 'seh', 'se_no', 'se_se', 'ses_ml', 'ses', 'se', 'sg_cf', 'sg', 'sh_ba', 'sh_cs', 'shi_latn_ma', 'shi_latn', 'shi_ma', 'shi_tfng_ma', 'shi_tfng', 'shi', 'sh', 'sh_yu', 'si_lk', 'si', 'sk_sk', 'sk', 'sl_si', 'sl', 'smn_fi', 'smn', 'sn', 'sn_zw', 'so_dj', 'so_et', 'so_ke', 'so_so', 'so', 'sq_al', 'sq_mk', 'sq', 'sq_xk', 'sr_ba', 'sr_cs', 'sr_cyrl_ba', 'sr_cyrl_cs', 'sr_cyrl_me', 'sr_cyrl_rs', 'sr_cyrl', 'sr_cyrl_xk', 'sr_cyrl_yu', 'sr_latn_ba', 'sr_latn_cs', 'sr_latn_me', 'sr_latn_rs', 'sr_latn', 'sr_latn_xk', 'sr_latn_yu', 'sr_me', 'sr_rs', 'sr', 'sr_xk', 'sr_yu', 'su_id', 'su_latn_id', 'su_latn', 'su', 'sv_ax', 'sv_fi', 'sv_se', 'sv', 'sw_cd', 'sw_ke', 'sw', 'sw_tz', 'sw_ug', 'ta_in', 'ta_lk', 'ta_my', 'ta_sg', 'ta', 'te_in', 'teo_ke', 'teo', 'teo_ug', 'te', 'tg_tj', 'tg', 'th_th_traditional', 'th_th', 'th', 'ti_er', 'ti_et', 'ti', 'tk_tm', 'tk', 'tl_ph', 'tl', 'to_to', 'to', 'tr_cy', 'tr_tr', 'tr', 'tt_ru', 'tt', 'twq_ne', 'twq', 'tzm_ma', 'tzm', 'ug_cn', 'ug', 'uk', 'uk_ua', 'ur_in', 'ur_pk', 'ur', 'uz_af', 'uz_arab_af', 'uz_arab', 'uz_cyrl', 'uz_cyrl_uz', 'uz_latn', 'uz_latn_uz', 'uz', 'uz_uz', 'vai_latn_lr', 'vai_latn', 'vai_lr', 'vai', 'vai_vaii_lr', 'vai_vaii', 'vi', 'vi_vn', 'vun', 'vun_tz', 'wae_ch', 'wae', 'wo_sn', 'wo', 'xh', 'xh_za', 'xog', 'xog_ug', 'yav_cm', 'yav', 'yi_001', 'yi', 'yo_bj', 'yo_ng', 'yo', 'yue_cn', 'yue_hans_cn', 'yue_hans', 'yue_hant_hk', 'yue_hant', 'yue_hk', 'yue', 'zgh_ma', 'zgh', 'zh_cn', 'zh_hans_cn', 'zh_hans_hk', 'zh_hans_mo', 'zh_hans_sg', 'zh_hans', 'zh_hant_hk', 'zh_hant_mo', 'zh_hant_tw', 'zh_hant', 'zh_hk', 'zh_mo', 'zh_sg', 'zh_tw', 'zh', 'zu', 'zu_za'];
    },
    _getLocaleFromPath: function (path) {
      if (!path) return '';
      const pathStr = path.toLowerCase().replace(/^\/site\/website\//, '');
      const localeCode = pathStr.split('/')[0];

      if (this._getLocaleList().indexOf(localeCode) >= 0) {
        return localeCode;
      }

      return '';
    },
    _getGraphqlContentType: function (contentType) {
      if (!contentType) return '';
      return contentType.toLocaleLowerCase().replace(/^\//, '').replace(/\//g, '_');
    },
    _updateUUID: function (obj) {
      const newUUID = CStudioAuthoring.Utils.generateUUID();
      obj.form.updateModel('localeSourceId_s', newUUID);
      return newUUID;
    },
    _renderReactComponent: function (obj) {
      const pathLocale = this._getLocaleFromPath(obj.form.path);

      const graphqlContentType = this._getGraphqlContentType(obj.form.model['content-type']);

      const {
        localeCode_s: localeCode,
        localeSourceId_s: localeSourceId
      } = obj.form.model; // new item

      if (!localeSourceId) {
        const locale = {
          localeCode: pathLocale,
          localeSourceId: CStudioAuthoring.Utils.generateUUID()
        };
        obj.form.updateModel('localeCode_s', locale.localeCode);
        obj.form.updateModel('localeSourceId_s', locale.localeSourceId);
        ReactDOM.unmountComponentAtNode(obj.containerEl);
        ReactDOM.render(React.createElement(CustomLocale, {
          locale,
          updateUUID: () => this._updateUUID(obj)
        }), obj.containerEl);
        return;
      } // item copied to different locale


      if (pathLocale && pathLocale !== localeCode) {
        const locale = {
          localeCode: pathLocale,
          localeSourceId: obj.form.model.localeSourceId_s
        };
        obj.form.updateModel('localeCode_s', locale.localeCode);
        ReactDOM.unmountComponentAtNode(obj.containerEl);
        ReactDOM.render(React.createElement(CustomLocale, {
          locale,
          updateUUID: () => this._updateUUID(obj)
        }), obj.containerEl);
        return;
      } // item copied to same locale or just editing
      // search for existing localeSourceId


      fetch(`${window.location.origin}/api/1/site/graphql`, {
        headers: {
          'content-type': 'application/json'
        },
        body: `{\"query\":\"query SearchLocale {\\n  ${graphqlContentType} {\\n    items {\\n      localeCode_s(filter: {equals: \\\"${obj.form.model.localeCode_s}\\\"})\\n      localeSourceId_s(filter: {equals: \\\"${obj.form.model.localeSourceId_s}\\\"})\\n    }\\n  }\\n}\\n\",\"variables\":null,\"operationName\":\"SearchLocale\"}`,
        'method': 'POST',
        'credentials': 'include'
      }).then(response => response.json()).then(data => {
        const locale = {
          localeCode: pathLocale,
          localeSourceId: obj.form.model.localeSourceId_s
        }; // more than 1 record with same locale code is considered as a new copied is created.

        if (data && data.data[graphqlContentType].items && data.data[graphqlContentType].items.length >= 2) {
          locale.localeSourceId = CStudioAuthoring.Utils.generateUUID();
          obj.form.updateModel('localeCode_s', locale.localeCode);
          obj.form.updateModel('localeSourceId_s', locale.localeSourceId);
        }

        ReactDOM.unmountComponentAtNode(obj.containerEl);
        ReactDOM.render(React.createElement(CustomLocale, {
          locale,
          updateUUID: () => this._updateUUID(obj)
        }), obj.containerEl);
      });
    },
    render: function (config, containerEl) {
      containerEl.id = this.id;

      this._renderReactComponent(this);
    },
    getValue: function () {
      return this.value;
    },
    setValue: function (value) {
      this.value = value;
    },
    getName: function () {
      return 'custom-locale';
    },
    getSupportedProperties: function () {
      return [];
    },
    getSupportedConstraints: function () {
      return [];
    },
    getSupportedPostFixes: function () {
      return this.supportedPostFixes;
    }
  });
  CStudioAuthoring.Module.moduleLoaded('custom-locale', CStudioForms.Controls.CustomLocale);
})();