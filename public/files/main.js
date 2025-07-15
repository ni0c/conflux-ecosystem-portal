const isViewed = (entries, observer) => {
  entries.forEach(entry => {
    //console.log(entry);
    entry.target.classList.toggle("is-viewed", entry.isIntersecting);
  });
};

const IObs = new IntersectionObserver(isViewed);
 
// Attach observer to every [data-is-viewed] element:
document.querySelectorAll('[data-isViewed]').forEach(el => {
    IObs.observe(el, {});
});

let calc, _categories, _categoriesList;
let _projects = [];
let _projectCategories = [];
let _metrics = {};
let _allMetrics = {};
let _metricsHtml = [];
let dataForEdit = {};
let _selectedCategory = false; // defaults to all categories (false)
let forms = [];


main();

//

async function main()
{
  const tempImport  = await import("./calc.js");
  calc = tempImport.calc;
  
  _ui.init();

  _user.checkError();

  _user.check();

  _menu.init();

  _menu.getPage('projects');

}

const _ui = {

  metricsRawData: {},
  metricsData: {},
  metrics: {},

  init: async function() 
  {
    this.initMetrics();
    this.initHelpers();
  },

  initHelpers: async function()
  {
    // get data
    let url = getHandlerURL();
    let postData = {'req': 'helpersList'};
    let data = await makePost(url, postData);

    console.log("initHelpers:", data);
    
    if (!data || !data.data)
    {
      console.log("initHelpers:err:no data");
      return;
    }

    let el = document.getElementById("helpers-list");
    el.textContent = "";

    for (let i=0; i<data.data.length; i++)
    {
      let _helper = data.data[i];
      let headline = _helper.headline;
      let desc = _helper.desc;
      let link = _helper.link;
      let onclick = _helper.onclick;

      let _css = "scale-in3";
      if (i==0)
      {
        _css = "scale-in1";
      }
      if (i===1)
      {
        _css = "scale-in2";
      }

      let _html;
      if (onclick && (!link || link.length == 0))
      {
        // OnClick
        _html = `
        <div class="helper-wrapper" data-isViewed="${_css}" onClick="javascript:${onclick}">
          <div class="helper">
            <div class="helper-heading">${headline}</div>
            <div class="helper-desc">${desc}</div>
          </div>
        </div>
        `;

      } else 
      {
        // Link
        _html = `
        <a class="helper-link-wrapper" href="${link}" target="_blank">
          <div class="helper-wrapper" data-isViewed="${_css}">
            <div class="helper">
              <div class="helper-heading">${headline}</div>
              <div class="helper-desc">${desc}</div>
            </div>
          </div>
        </a>
        `;
      }

      el.insertAdjacentHTML("beforeend", _html);
      
      
    }

    document.querySelectorAll('.helper-wrapper').forEach(el => {
      IObs.observe(el, {});
    });

    if (_user.isLoggedIn())
    {
      if (document.getElementById("add-project-logged-out"))
      {
        document.getElementById("add-project-logged-out").className = "hidden";
      }
      if (document.getElementById("add-project-logged-in"))
      {
        document.getElementById("add-project-logged-in").className = "";
      }
    }
    


  },

  initMetrics: async function()
  {
    // get metrics w/ datasources & data
    await this.getMetrics();

    // render metrics w/ datasources&data
    await this.renderMetrics();

  },

  getMetrics: async function()
  {
    // get data
    let url = getHandlerURL();
    let postData = {'req': 'getMetrics'};
    _ui.metricsRawData = await makePost(url, postData);

    console.log("getMetrics:", _ui.metricsRawData);
  },

  renderMetrics: async function()
  {
    // parse datasources w/ data
    iterateDatasourcesWithData(this.metricsRawData.data.datasources, this.metricsRawData.data.datas);

    for (let dsid in _allMetrics)
    {
      let pathsWithData = _allMetrics[dsid];
      for (let path in pathsWithData)
      {
        let data = pathsWithData[path];
        this.metricsData[path] = this.parseDatasourceData(data);
      }
    }
    console.log("parseMetrics:pathsWithData:", this.metricsData);

   let el = document.getElementById("metrics");
   el.textContent = "";

    // parse metrics with data
    for (let i=0; i<this.metricsRawData.data.metrics.length; i++)
    {
      let metric = this.metricsRawData.data.metrics[i];
      let heading = metric.heading;
      let rawMetric = metric.metric;
      let _finalMetric = str2calc4(rawMetric, this.metricsData);

      // TODO: Add calculations/math possibility ?
      let _css = 'scale-in3';
      switch (i)
      {
        case 0:
          _css = 'scale-in1';
          break;
        case 1:
          _css = 'scale-in2';
          break;
      }

      let html = `
        <div class="metric" data-isViewed="${_css}">
          <div class="metric_desc">${heading}</div>
          <div class="metric_value">${_finalMetric}</div>
        </div>  
      `;
      el.insertAdjacentHTML("beforeend", html);    
      
    }

    document.querySelectorAll('.metric').forEach(el => {
      IObs.observe(el, {});
    });

  },

  parseDatasourceData: function(data)
  {
    let nbr = +data;
    //console.log(`pdsd:data:${typeof(data)}:${data}`);
    //console.log(`pdsd:nbr:${typeof(nbr)}:${nbr}`);

    if (isNaN(nbr))
    {
      return data;
    }   
    return this.formatNbr(nbr);

  },

  formatNbr: function(nbr, precision=100)
  {
    // let precision = 100; // 3 numbers
    let postfixes = ['', ' k', ' M', ' B', ' T'];
    let c = 0;
    //console.log(`formatNbr:nbr:${typeof(nbr)}:${nbr}`);

    if (nbr > 1e18)
    {
      nbr = nbr/1e18;
    }

    while (nbr >= 1000 && c < postfixes.length)
    {
      //console.log(`formatNbr:nbr:${typeof(nbr)}:${nbr}`);

      nbr = nbr / 1000;
      c++;
    }
    let _calc = Math.round(nbr * precision) / precision;
    //console.log(`formatNbr:calc:${typeof(calc)}:${calc}`);

    return '' + _calc + postfixes[c];
  }

};


const _menu = {
  init: async function()
  {
    if (_user.isMod)
    {
      console.log("user is a mod")
    }
    const els = document.getElementsByClassName("is-mod");
    for (let i=0; i<els.length; i++)
    {
      const el = els[i];
      if (_user.isMod)
      {
        el.classList.remove("hidden");
        continue;
      } 

      if (!el.classList.contains('hidden'))
      {
        el.classList.add("hidden");
      }
    
    }
  },
  getPage: function(page)
  {
    switch (page)
    {
      case 'mods':
      case 'metrics':
      case 'datasources':
      case 'helpers':
        if (!_user.isMod)
        {
          return;
        }
        getList(page);
        break;

      case 'projects':
        getList(page);
        break;
       
    }
  }
};

const _user = {
  loginData: null,
  isMod: false,
  validUntil: null,
  username: null,
  checkError: async function()
  {
    let cookie = ERROR_COOKIE;
    let ret = getCookie(cookie);
    console.log("getCookie:", ret);
    if (!!ret)
    {
      let retObj = JSON.parse(ret);
      if (!!retObj.error)
      {
        clearCookie(cookie);
        showError(retObj.error + "\n\nPlease try again.");
        // alert(retObj.error + "\n\nPlease try again.");
      } else 
      {
        clearCookie(cookie);
        //alert(retObj.success);
        showNotice("user:login-success", retObj.success);
      }
    }
    
  },
  isLoggedIn: function()
  {
    return !!this.username;
  },
  check: async function()
  {
    let url = getHandlerURL();
    let postData = {'req': 'checkLogin'};
    let data = await makePost(url, postData);
    console.log("_user.check: response data:", data);
    
    if (data.error || !data.data)
    {
      // error
      return;
    }

    let _data = data.data;
    
    if (!_data.loggedIn)
    {
      // user not logged in
      return;
    }

    // isMod
    if (_data.mod)
    {
      _user.isMod = true;
      // TODO: Enable mod user tasks
    }

    let userData = _data.data;
    let ghData = userData.data;

    console.log("userData:", userData);
    console.log("ghData:", ghData);
    let username = userData.user;

    _user.username = username;

    let el = document.getElementById("logged-in");
    el.innerHTML = `<div class="disabled-button" title="Signed in as GitHub user: ${username}"><i class="fa-solid fa-user-large"></i>&nbsp;&nbsp;&nbsp;${username}</div>`;
    document.getElementById("logged-out").className = "hidden";
    el.className = "";

   _menu.init();

    if (document.getElementById("add-project-logged-out"))
    {
      document.getElementById("add-project-logged-out").className = "hidden";
    }
    if (document.getElementById("add-project-logged-in"))
    {
      document.getElementById("add-project-logged-in").className = "";
    }



  }
};

/*
  {
      "success": true,
      "data": {
          "loggedIn": true,
          "code": "COOKIE_OK",
          "data": {
              "mod": true,
              "data": {
                  "id": 189238580,
                  "user": "web-o-matic",
                  "data": {
                      "login": "web-o-matic",
                      "id": 189238580,
                      "node_id": "U_kgDOC0eNNA",
                      "avatar_url": "https:\/\/avatars.githubusercontent.com\/u\/189238580?v=4",
                      "gravatar_id": "",
                      "url": "https:\/\/api.github.com\/users\/web-o-matic",
                      "html_url": "https:\/\/github.com\/web-o-matic",
                      "followers_url": "https:\/\/api.github.com\/users\/web-o-matic\/followers",
                      "following_url": "https:\/\/api.github.com\/users\/web-o-matic\/following{\/other_user}",
                      "gists_url": "https:\/\/api.github.com\/users\/web-o-matic\/gists{\/gist_id}",
                      "starred_url": "https:\/\/api.github.com\/users\/web-o-matic\/starred{\/owner}{\/repo}",
                      "subscriptions_url": "https:\/\/api.github.com\/users\/web-o-matic\/subscriptions",
                      "organizations_url": "https:\/\/api.github.com\/users\/web-o-matic\/orgs",
                      "repos_url": "https:\/\/api.github.com\/users\/web-o-matic\/repos",
                      "events_url": "https:\/\/api.github.com\/users\/web-o-matic\/events{\/privacy}",
                      "received_events_url": "https:\/\/api.github.com\/users\/web-o-matic\/received_events",
                      "type": "User",
                      "user_view_type": "public",
                      "site_admin": false,
                      "name": "Web-o-Matic",
                      "company": null,
                      "blog": "",
                      "location": null,
                      "email": null,
                      "hireable": null,
                      "bio": null,
                      "twitter_username": null,
                      "notification_email": null,
                      "public_repos": 0,
                      "public_gists": 0,
                      "followers": 0,
                      "following": 0,
                      "created_at": "2024-11-21T12:29:15Z",
                      "updated_at": "2024-11-21T12:32:01Z"
                  },
                  "modified": "1737557870"
              }
          }
      },
      "_debug": [
          "getUser: web-o-matic",
          "parseGithubUsername: web-o-matic > web-o-matic | web-o-matic"
      ]
  }
*/

const popup = {
  open: function(nbr, html)
  {
    let _popup = 'popup';
    switch (nbr)
    {
      case 1:
        _popup += '1';
        break;
      case 2:
        _popup += '2';
        break;
      case 3:
        _popup += '3';
        break;
      case 4:
        _popup += '4';
        break;
      default:
        return;
    }

    let el = document.getElementById(_popup);
    let el2 = document.getElementById(`${_popup}-text`);

    el2.textContent = "";

    el2.insertAdjacentHTML("beforeend", html);    

    el.classList.remove('show');
    el.classList.add('show');


    
  },
  close: function(nbr)
  {
    let _popup = 'popup';
    switch (nbr)
    {
      case 1:
        _popup += '1';
        break;
      case 2:
        _popup += '2';
        break;
      case 3:
        _popup += '3';
        break;
      case 4:
        _popup += '4';
        break;
      default:
        return;
    }

    let el = document.getElementById(_popup);
    let el2 = document.getElementById(`${_popup}-text`);
    el.classList.remove('show');

    el2.textContent = "";

  }
  
};

function _scrollTo(id)
{
  if (!id)
  {
    console.log("_scrollTo: error: id missing");
    return;
  }
  let el = document.getElementById(id);
  if (!el)
  {
    console.log("_scrollTo: error: no element found with id");
    return;
  }
  el.scrollIntoView({ behavior: "smooth", inline: "nearest" });
}

function copyObject(obj)
{
  let copyObj = {}; 
  if (!(obj instanceof Object)) 
  {
    console.log("copyObject: not an object");
    return {};
  }
  for (var attr in obj) 
  {
    if (obj.hasOwnProperty(attr)) 
    {
      copyObj[attr] = obj[attr];
    }
  }
  return copyObj;

}

async function getImageDimensionsFromFile(file) 
{
  let dimArray; 
  let src;
  let isReady = false;
  
  var reader = new FileReader();
  reader.onload = async function (e) 
  {
    src = e.target.result;
    isReady = true;
  }
  reader.readAsDataURL(file);

  while(!isReady)
  {
    await usleep(50);
  }

  dimArray = await _getImageDim(src);
  console.log("getImageDimensionsFromFile X Y:", dimArray);
 
  if (!dimArray)
  {
    console.log("getImageDimensionsFromFile: Invalid image");
    return [false, "Logo Image does not contain a valid image"];
  }  

  let width = dimArray[0];
  let height = dimArray[1];

  if (width !== height)
  {
    console.log("getImageDimensionsFromFile: Invalid image dimensions. Not a square image");
    return [false, "Logo image is not a square. Please provide a square image"];
  }

  if (width < 32)
  {
    console.log("getImageDimensionsFromFile: Invalid image dimensions. Image too small");
    return [false, "Logo image is too small. Please provide larger image (bigger than 32x32)"];
  }

  console.log("getImageDimensionsFromFile: ok");
  return [true, null];
}

function readImageFile() 
{
  if (this.files && this.files[0]) 
  {
    var FR= new FileReader();
    FR.addEventListener("load", function(e) 
    {
      document.getElementById("img").src = e.target.result;
      //get the base64 encoded string and add it to id=b64. 
      document.getElementById("base64").value = e.target.result;
    }); 

    FR.readAsDataURL( this.files[0] );
  }
}

async function makePost(url, data={}, headers={}, files=null) 
{
  console.log("makePost:", url, data, headers);

  let formData = new FormData();
  for (let key in data)
  {
    formData.append(key, data[key]);
  }
  if (files)
  {
    for (let i=0; i<files.length; i++)
    {
      let file = files[i];
      formData.append(file.key, file.file, file.filename);
    }
  }


  //let body = JSON.stringify(data);
  let body = formData;

  const response = await fetch(url, {
    method: "POST",
    mode: "same-origin",
    cache: "no-cache",
    credentials: "same-origin",
    headers: headers,
    redirect: "error",
    referrerPolicy: "same-origin",
    body: body,
  });
 
  let _resp = response.json().catch(function(e)
  {
    console.log("makePost json error:", e);
    return null;
  });

  return _resp;
}

function str2calc2(_str, data)
{
  // example:
  // input: str:  "data1.posStaked / data2.circSupply * 100"
  //        data: {data1: {posStaked: 100}, data2: {circSupply: 1000}}
  // output: "100/1000*100"

  if (!(data instanceof Object)) 
  {
    data = {};
  }

  let str = String(_str).replace(/\s/g, '');
  const regexp = /[a-z]+[a-z0-9]*[a-z0-9\.]*/ig;
  let matches = str.match(regexp);

  let values = [];

  for (let i=0; i<matches.length; i++)
  {
    let match = matches[i];
    let dotMatches = match.match(/\./);
    let err = false;
    if (dotMatches && dotMatches.length > 0)
    {
      // have dot(s)
      let pieces = match.split('.');
      let recur = copyObject(data);
      for(let j=0; j<pieces.length; j++)
      {
        let piece = pieces[j];
        if (!(piece in recur))
        {
          console.log("str2calc2: Recursion error.");
          console.log("str:",str);
          console.log("recur:", recur);
          console.log("data:", data);
          err = true;
        }

        recur = recur[piece];
        
      }
      if (err)
      {
        values.push("0");
      } else 
      {
        values.push(String(recur));
      }
    } else if (!(match in data))
    {
      console.log("str2calc2: value from str missing in data.");
      console.log("str:",str);
      console.log("data:", data);
      values.push("0");
    } else 
    {
      values.push(data[match])
    }
    
  }

  let newstr = str;

  for (let i=0; i<matches.length; i++)
  {
    let match = matches[i];
    let value = values[i];
    newstr = newstr.replace(match, value);
  }

  console.log("str:", newstr);

  const _calc =  calc(newstr);
  
  console.log("calc:", _calc);

  return _calc;
}


function str2calc3(_str, data)
{
  // example:
  // input: str:  "data1.posStaked / data2.circSupply * 100"
  //        data: {data1: {posStaked: 100}, data2: {circSupply: 1000}}
  // output: "100/1000*100"

  if (!(data instanceof Object)) 
  {
    data = {};
  }

  let str = String(_str).replace(/\s/g, '');
  const regexp = /[a-z0-9]+[a-z0-9\.]*/ig;
  let matches = str.match(regexp);

  let newstr = str;

  for (let i=0; i<matches.length; i++)
  {
    let match = matches[i];
    for (let path in data)
    {
      if (path.toLowerCase() == match.toLowerCase())
      {
        newstr = newstr.replace(match, data[path]);
      }
    } 
  }

  console.log("str:", newstr);

  return newstr;

  //const _calc =  calc(newstr);
  
  //console.log("calc:", _calc);

  //return _calc;
}

function str2calc4(_str, data)
{
  // example:
  // input: str:  "data1.posStaked / data2.circSupply * 100"
  //        data: {data1: {posStaked: 100}, data2: {circSupply: 1000}}
  // output: "100/1000*100"

  if (!(data instanceof Object)) 
  {
    data = {};
  }

  let str = String(_str).replace(/\s/g, '');
  const regexp = /[a-z0-9]+[a-z0-9\.]*/ig;
  let matches = str.match(regexp);

  let newstr = str;

  for (let i=0; i<matches.length; i++)
  {
    let match = matches[i];
    for (let tpath in data)
    {
      let path = tpath.trim();
      let _path = '{' + path.toLowerCase() + '}';
      let _match = '{' + match.toLowerCase().trim() + '}';
      //console.log(`str:pathmatch:${_path}:${_match}`);
      if (_path == _match)
      {
        let tmatch = '{' + match.trim() + '}';
        //console.log(`str:pathmatch:${_path}:${_match}:${data[path]}`);
        newstr = newstr.replace(tmatch, data[path]);
      }
    } 
  }

  console.log("str:", newstr);

  return newstr;

  //const _calc =  calc(newstr);
  
  //console.log("calc:", _calc);

  //return _calc;
}


/* 
  forms:
  [
    // Form number #0
    {
      handler_endpoint,
      [fields]
    },
  
    // Form number #1 
    {
      handler_endpoint,
      [fields]
    }, 
    
    ...
  ]

*/



function getForm(type, data={})
{
  let formObj = {
    handler: null,
    fields: [],
  };
  formObj.handler = getHandlerURL();

  let value, key, _heading, _text, _layer;

  switch (type)
  {
    case 'addMod':
      /* 
        form fields:
        - github username
      */
      formObj.fields = [
        {
          type: 'heading',
          desc: 'Add a Moderator',
        },
        {
          type: 'githubUser',
          name: 'username',
          desc: 'Github Username',
          value: '',
          empty: false,
        },
        {
          type: 'email',
          name: 'email',
          desc: 'E-mail',
          value: '',
          empty: false,
        }
      ];
      formObj.submitButtonText = `<i class="fa-solid fa-user-plus"></i>Add`;
      formObj.postData = {'req': 'addMod'};
      formObj.openPage = 'mods';

      populateForm(formObj, 2);
      
      break;
    
    case 'addProject':
    case 'modifyProject':

      _heading = 'Add a Project';
      if (type == 'modifyProject')
      {
        _heading = 'Edit Project';
      }

      formObj.fields = [{
        type: 'heading',
        desc: _heading,
      }];

      value = '';
      key = "name";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'name',
        name: key,
        desc: 'Project Name',
        shortdesc: 'Project Name',
        value: value,
        empty: false
      });

      if (type == 'modifyProject')
      {
        value = '';
        key = "logoupdate";
        if (key in data && data[key])
        {
          value = data[key];
        }
        formObj.fields.push({
          type: 'singlebox',
          name: key,
          desc: 'Update Logo?',
          shortdesc: 'Logo Update',
          value: 'Yes',
          empty: true
        });
      }

      value = '';
      key = "logoimg";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'logoImage',
        name: key,
        desc: 'Logo Image. Logo dimensions must be square (for.ex. 500x500)',
        shortdesc: 'Logo Image',
        value: value,
        empty: true,
        emptyalt: "logo"
      });

      value = '';
      key = "logo";
      if (key in data && data[key])
      {
        //value = data[key];
      }
      formObj.fields.push({
        type: 'logoUrl',
        name: key,
        desc: 'Alt method: Link to Logo. Logo dimensions must be square (for.ex. 500x500)',
        shortdesc: 'Logo Image URL',
        value: value,
        empty: true,
        emptyalt: "logoimg"
      });

      value = '';
      key = "desc";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'longtext',
        name: key,
        desc: 'Describe your project in few sentences',
        shortdesc: 'Project Description',
        value: value,
        empty: false
      });
      
      value = '';
      key = "website";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'url',
        name: key,
        desc: 'Website',
        shortdesc: 'Website',
        value: value,
        empty: true
      });

      value = '';
      key = "linktree";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'url',
        name: key,
        desc: 'Link Tree',
        shortdesc: 'Link Tree',
        value: value,
        empty: true
      });

      value = '';
      key = "twitter";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'url',
        name: key,
        desc: 'X/Twitter',
        shortdesc: 'X/Twitter',
        value: value,
        empty: true
      });
      
      value = '';
      key = "discord";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'url',
        name: key,
        desc: 'Discord',
        shortdesc: 'Discord',
        value: value,
        empty: true
      });

      value = '';
      key = "tg";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'url',
        name: key,
        desc: 'Telegram',
        shortdesc: 'Telegram',
        value: value,
        empty: true
      });

      value = '';
      key = "wechat";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'url',
        name: key,
        desc: 'WeChat',
        shortdesc: 'WeChat',
        value: value,
        empty: true
      });
      
      value = '';
      key = "github";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'url',
        name: key,
        desc: 'GitHub',
        shortdesc: 'GitHub',
        value: value,
        empty: true
      });

      value = '';
      key = "categories";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'categories',
        name: key,
        desc: 'Project Categories (separate with comma)',
        shortdesc: 'Categories',
        value: value,
        empty: false
      });
      
      formObj.postData = {'req': type};
      formObj.openPage = 'projects';

      _text = `<i class="fa-solid fa-circle-plus"></i>Add`;
      _layer = 1;      

      if (type == 'modifyProject')
      {
        formObj.postData["projectId"] = data.projectId;
        _text = `<i class="fa-solid fa-wrench"></i>Edit`;
        _layer = 1;
      }
      formObj.submitButtonText = _text;

      populateForm(formObj, _layer);

      break;

    case 'addDatasource':
    case 'modifyDatasource':
             
      _heading = 'Add a Data Source';
      if (type == 'modifyDatasource')
      {
        _heading = 'Edit Data Source';
      }

      formObj.fields = [{
        type: 'heading',
        desc: _heading,
      }];

      value = '';
      key = "name";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'name',
        name: key,
        desc: 'Data Source Name',
        shortdesc: 'Name',
        value: value,
        empty: false
      });

      value = '';
      key = "dsid";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'dsid',
        name: key,
        desc: 'Data Source ID (Add alpha-numeric ID - max 8 chars)',
        shortdesc: 'ID',
        value: value,
        empty: false
      });
      
      value = '';
      key = "url";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'url',
        name: key,
        desc: 'API URL',
        shortdesc: 'Api URL',
        value: value,
        empty: false
      });


      // type
      // returnAs ?
      // httpAuth ?
      // headers ?
      // data (as json)
    
      value = '';
      key = "type";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'enum',
        name: key,
        desc: 'Request Type',
        shortdesc: 'Request Type',
        options: [
          "GET",
          "POST",
          "JSON",
        ],
        defaultOption: "JSON",
        value: value,
        empty: false
      });


      value = '';
      key = "cron";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'enum',
        name: key,
        desc: 'API data fetch times',
        shortdesc: 'API data fetch times',
        options: [
          "once a day",
          "once every 2 days",
          "once every 3 days",
          "once a week",
        ],
        defaultOption: "once a day",
        value: value,
        empty: false
      });


      value = '';
      key = "returnAs";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'enum',
        name: key,
        desc: 'API data return type',
        shortdesc: 'API data return type',
        options: [
          "JSON",
          "float",
          "string"
        ],
        defaultOption: "JSON",
        value: value,
        empty: false
      });


      value = '';
      key = "httpAuth";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'httpauth',
        name: key,
        desc: 'HTTP authentication ( username:password )',
        shortdesc: 'HTTP Auth',
        value: value,
        empty: true
      });


      value = '';
      key = "headers";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'longtext',
        name: key,
        desc: 'Request headers (separate with line feeds)',
        shortdesc: 'Request headers',
        value: value,
        empty: true
      });

      value = '';
      key = "mustHave";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'longtext',
        name: key,
        desc: 'Reply Data must have keys (Examples: success, info.text, inputs.0 - separate with line feed)',
        shortdesc: 'Reply must have keys',
        value: value,
        empty: true
      });

      value = '';
      key = "mustNotHave";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'longtext',
        name: key,
        desc: 'Reply Data must NOT have keys (Examples: error, error.msg - separate with line feed)',
        shortdesc: 'Reply must not have keys',
        value: value,
        empty: true
      });


      value = '';
      key = "json";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'json',
        name: key,
        desc: 'POST Data in pure JSON format',
        shortdesc: 'PostData JSON',
        value: value,
        empty: true
      });

      
      formObj.postData = {'req': type};
      
      formObj.openPage = 'datasources';
      _text = `<i class="fa-solid fa-circle-plus"></i>Add`;
      _layer = 1;
      if (type == 'modifyDatasource')
      {
        formObj.postData["_dsid"] = data.dsid;
        _text = `<i class="fa-solid fa-wrench"></i>Edit`;
        _layer = 2;
      }
      formObj.submitButtonText = _text;

      populateForm(formObj, 2);

      break;

    // Helpers are the helper info texts at the bottom of the page
    case 'addHelper':
    case 'modifyHelper':
      
      _heading = 'Add a Helper';
      if (type == 'modifyHelper')
      {
        _heading = 'Edit Helper';
      }
   
      formObj.fields = [{
        type: 'heading',
        desc: _heading,
      }];

      value = '';
      key = "headline";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'name',
        name: key,
        desc: 'Headline',
        shortdesc: 'Headline',
        value: value,
        empty: false
      });
 
      value = '';
      key = "desc";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'longtext',
        name: key,
        desc: 'Description',
        shortdesc: 'Description',
        value: value,
        empty: false
      });

      value = '';
      key = "link";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'url',
        name: key,
        desc: 'Link (if no OnClick)',
        shortdesc: 'Link',
        value: value,
        empty: true
      });

      value = '';
      key = "onclick";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'name',
        name: key,
        desc: 'OnClick (if no Link)',
        shortdesc: 'OnClick',
        value: value,
        empty: true
      });
      

      formObj.postData = {'req': type};
      formObj.openPage = 'helpers';

      _text = `<i class="fa-solid fa-circle-plus"></i>Add`;
      _layer = 1;
      if (type == 'modifyHelper')
      {
        formObj.postData["creationDate"] = data.creationDate;
        _text = `<i class="fa-solid fa-wrench"></i>Edit`;
        _layer = 2;
      }
      formObj.submitButtonText = _text;


      populateForm(formObj, 2);


      break;
    
    // Metrics use datasources and are displayed at the top of the page
    case 'addMetric':
    case 'modifyMetric':
      
      _heading = 'Add a Metric';
      if (type == 'modifyMetric')
      {
        _heading = 'Edit Metric';
      }
    
      formObj.fields = [{
        type: 'heading',
        desc: _heading,
      }];

      value = '';
      key = "heading";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'name',
        name: key,
        desc: 'Heading',
        shortdesc: 'Heading',
        value: value,
        empty: false
      });

      value = '';
      key = "metric";
      if (key in data && data[key])
      {
        value = data[key];
      }
      formObj.fields.push({
        type: 'metric',
        name: key,
        desc: 'Metric',
        shortdesc: 'Metric',
        value: value,
        empty: false
      });
      

      formObj.postData = {'req': type};
      formObj.openPage = 'metrics';

      _text = 'Add';
      _layer = 1;
      if (type == 'modifyMetric')
      {
        formObj.postData["creationDate"] = data.creationDate;
        _text = 'Edit';
        _layer = 2;
      }
      formObj.submitButtonText = `<i class="fa-solid fa-circle-plus"></i> ${_text}`;

      populateForm(formObj, 2);

      break;



    default:
      console.log("Error: getForm: No form type defined. Aborting.");

  }
}

function getHandlerURL()
{
  let url = HANDLER_URL;
  let date = Date.now() + getRandomNumber(4);
  if (url.indexOf("?") == -1)
  {
    url += "?" + date;
  } else 
  {
    url += "&" + date;
  }
  return url;
}

async function parseAction(action, value)
{
  let url, postData, data, _fname, found;

  _fname = "parseAction";

  console.log(`${_fname}:`, action, value);

  switch (action)
  {
    case 'removeMod':
      // make a post request
      url = getHandlerURL();
      postData = {'req': 'removeMod', 'mod': value};
      data = await makePost(url, postData);
      _fname = "parseAction[removeMod]"

      console.log(`${_fname}: data:`, data);

      if (!data || ("error" in data) || !(data.success))
      {
        //console.log("parseAction[removeMod]: invalid data");
        showError(`${_fname}: invalid data:`, true, `Could not remove moderator. Got error: "${data.error}" \n\nPlease try again later or contact admin if necessary.`);
        return;
      }
      
      // update page after
      _menu.getPage('mods');
      break;

    case 'editDatasource':
        
      found = false;
      for (i=0; i<dataForEdit["datasources"].length; i++)
      {
        let arr = dataForEdit["datasources"][i];
        if (!arr.dsid || arr.dsid != value)
        {
          continue;
        }

        getForm('modifyDatasource', arr);
        found = true;
        break;
      }
      if (!found)
      {
        showError("parseAction:error:datasource not found", true, `Could not find datasource to edit. \n\nPlease try again later or contact admin if necessary.`);
      }

      break;

    case 'editMetric':
        
      found = false;
      for (i=0; i<dataForEdit["metrics"].length; i++)
      {
        let arr = dataForEdit["metrics"][i];
        if (!arr.creationDate || arr.creationDate != value)
        {
          continue;
        }

        getForm('modifyMetric', arr);
        found = true;
        break;
      }
      if (!found)
      {
        showError("parseAction:error:metric not found", true, `Could not find metric to edit. \n\nPlease try again later or contact admin if necessary.`);
      }

      break;

   case 'editProject':
        
      found = false;
      for (i=0; i<_projects.length; i++)
      {
        let arr = _projects[i];
        if (!arr.projectId || arr.projectId != value)
        {
          continue;
        }

        getForm('modifyProject', arr);
        found = true;
        break;
      }
      if (!found)
      {
        showError("parseAction:error:project not found", true, `Could not find project to edit. \n\nPlease try again later or contact admin if necessary.`);
      }

      break;      

      
    case 'editHelper':
        
      found = false;
      for (i=0; i<dataForEdit["helpers"].length; i++)
      {
        let arr = dataForEdit["helpers"][i];
        if (!arr.creationDate || arr.creationDate != value)
        {
          continue;
        }

        getForm('modifyHelper', arr);
        found = true;
        break;
      }
      if (!found)
      {
        showError("parseAction:error:helper not found", true, `Could not find helper to edit. \n\nPlease try again later or contact admin if necessary.`);
      }

      break;  

   case 'approveProject':
      // make a post request
      url = getHandlerURL();
      postData = {'req': 'approveProject', 'projId': value};
      data = await makePost(url, postData);
      _fname = "parseAction[approveProject]"

      console.log(`${_fname}: data:`, data);

      if (!data || ("error" in data) || !(data.success))
      {
        //console.log("parseAction[removeMod]: invalid data");
        showError(`${_fname}: invalid data:`, true, `Could not approve project. Got error: "${data.error}" \n\nPlease try again later or contact admin if necessary.`);
        return;
      }
      
      // update page after
      _menu.getPage('projects');
      break;      

   case 'removeProject':
      // make a post request
      url = getHandlerURL();
      postData = {'req': 'removeProject', 'projId': value};
      data = await makePost(url, postData);
      _fname = "parseAction[removeProject]"

      console.log(`${_fname}: data:`, data);

      if (!data || ("error" in data) || !(data.success))
      {
        //console.log("parseAction[removeMod]: invalid data");
        showError(`${_fname}: invalid data:`, true, `Could not remove project. Got error: "${data.error}" \n\nPlease try again later or contact admin if necessary.`);
        return;
      }
      
      // update page after
      _menu.getPage('projects');
      break;

    case 'editProjectOrder':
      // make a post request
      url = getHandlerURL();
      let _projId = value[0];
      let _tid = value[1];
      let el = document.querySelector(`[data-order-select-id="${_tid}"]`);
      let _order = el.value;
      postData = {'req': 'editProjectOrder', 'projId': _projId, 'order': _order};
      data = await makePost(url, postData);
      _fname = "parseAction[editProjectOrder]"

      console.log(`${_fname}: data:`, data);

      if (!data || ("error" in data) || !(data.success))
      {
        //console.log("parseAction[removeMod]: invalid data");
        showError(`${_fname}: invalid data:`, true, `Could not modify project order. Got error: "${data.error}" \n\nPlease try again later or contact admin if necessary.`);
        return;
      }
      
      // update page after
      _menu.getPage('projects');
      break;      

    case 'removeDatasource':
      // make a post request
      url = getHandlerURL();
      postData = {'req': 'removeDatasource', 'dsid': value};
      data = await makePost(url, postData);
      _fname = "parseAction[removeDatasource]"

      console.log(`${_fname}: data:`, data);

      if (!data || ("error" in data) || !(data.success))
      {
        //console.log("parseAction[removeMod]: invalid data");
        showError(`${_fname}: invalid data:`, true, `Could not remove datasource. Got error: "${data.error}" \n\nPlease try again later or contact admin if necessary.`);
        return;
      }
      
      // update page after
      _menu.getPage('datasources');
      break;

    case 'removeHelper':
      // make a post request
      url = getHandlerURL();
      postData = {'req': 'removeHelper', 'creationDate': value};
      data = await makePost(url, postData);
      _fname = "parseAction[removeHelper]"

      console.log(`${_fname}: data:`, data);

      if (!data || ("error" in data) || !(data.success))
      {
        //console.log("parseAction[removeMod]: invalid data");
        showError(`${_fname}: invalid data:`, true, `Could not remove helper. Got error: "${data.error}" \n\nPlease try again later or contact admin if necessary.`);
        return;
      }
      
      // update page after
      _menu.getPage('helpers');
      break;      


    case 'removeMetric':
      // make a post request
      url = getHandlerURL();
      postData = {'req': 'removeMetric', 'creationDate': value};
      data = await makePost(url, postData);
      _fname = "parseAction[removeMetric]"

      console.log(`${_fname}: data:`, data);

      if (!data || ("error" in data) || !(data.success))
      {
        //console.log("parseAction[removeMod]: invalid data");
        showError(`${_fname}: invalid data:`, true, `Could not remove metric. Got error: "${data.error}" \n\nPlease try again later or contact admin if necessary.`);
        return;
      }
      
      // update page after
      _menu.getPage('helpers');
      break; 

  }
}

async function viewProjects(applyCategory=null, projectsSearch=null)
{
  
  let thisClass;

  if (!_projectCategories || (isArray(_projectCategories) && _projectCategories.length == 0))
  {
    console.log("viewProjects:Error:no_project_categories_to_view:aborting");
    return;
  }
  if (!_projects || (isArray(_projects) && _projects.length == 0))
  {
    console.log("viewProjects:Error:no_projects_to_view:aborting");
    return;
  }

  let selected = _selectedCategory;
  // update categories panel
  if (applyCategory !== null)
  {
    selected = false; // defaults to all categories (false)

    for (let i=0; i<_projectCategories.length; i++)
    {
      let _cat = _projectCategories[i];
      if (applyCategory === _cat)
      {
        selected = applyCategory;
      }
    }

  }
 
  _selectedCategory = selected;

  let thisProjects = _projects;

  if (projectsSearch !== null)
  {
    selected = false; // all categories (false)
    
    thisProjects = projectsSearch;
  }

  thisClass = `category`;
  if (selected === false)
  {
    thisClass += ` selected`;
  }
  let catsHtml = `
    <div class="${thisClass}" onClick="javascript:viewProjects(false)">All categories</div>
  `;
  for (let i=0; i<_projectCategories.length; i++)
  {
    let _cat = _projectCategories[i];
    thisClass = `category`;
    if (selected === _cat)
    {
      thisClass += ` selected`;
    }
    catsHtml += `
    <div class="${thisClass}" onClick="javascript:viewProjects('${_cat}')">${_cat}</div>
    `;
  } 

  let elCats = document.getElementById("project-categories");
  elCats.textContent = "";
  
  elCats.insertAdjacentHTML("beforeend", catsHtml);

  let projectsForSorting = {
    1:[],
    2:[],
    3:[],
    4:[],
    5:[],
    6:[],
    7:[],
    8:[],
    9:[]
  };



  for (let i=0; i<thisProjects.length; i++)
  {
    let _proj = thisProjects[i];
    let _order = 5; // sort scale: 1-9
    if (!!_proj["order"])
    {
      let _torder = parseInt(_proj["order"]);
      if (_torder < 1 || _torder > 9)
      {
        _torder = 5;
      }
      _order = _torder;
    }
    projectsForSorting[_order].push(i);
  }



  // update projects list
  let projsHtml = ``;
  //for (let i=0; i<thisProjects.length; i++)

  for (let x=1; x<9; x++)
  {
    for (let y=0; y<projectsForSorting[x].length; y++)
    {
      let i = projectsForSorting[x][y];
      let _proj = thisProjects[i];
      let _order = 5; // sort scale: 1-9
      if (!!_proj["order"])
      {
        let _torder = parseInt(_proj["order"]);
        if (_torder < 1 || _torder > 9)
        {
          _torder = 5;
        }
        _order = _torder;
      }

      let add = true;
      let _pcatsHtml = ``;
      
      if (selected !== false)
      {
        add = false;
      }
      let _cats = _proj.categories;
      if (!_proj.categories || _proj.categories.length == 0)
      {
        console.log(`viewProjects:Error:projects:no_categories_set_on_project:`, _proj);
        // error with data, skipping
        continue;
      }
      for (let j=0; j<_cats.length; j++)
      {
        let _cat = String(_cats[j]).trim();
        if (_cat.length == 0)
        {
          console.log(`viewProjects:Error:projects:empty_category_on_project:`, _proj);
          continue;
        }
        if (_cat === selected)
        {
          add = true;
        }
        _pcatsHtml += `
          <div class="project-cat">
            ${_cat}
          </div>
        `;
      }
    
      if (!add)
      {
        continue;
      }
      let logoUrl = PUB_URL + _proj.logo;

      let checkLinks = ["linktree", "twitter", "discord", "wechat", "github", "tg" ];
      let symbols = {
        //"linktree":'<svg style="fill: rgb(30, 35, 48); width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xml:space="preserve"><path d="M24 0C10.745 0 0 10.745 0 24s10.745 24 24 24 24-10.745 24-24S37.255 0 24 0zm1.881 37.001h-3.762v-8.495h3.762v8.495zm8.707-13.622h-6.432l4.581 4.45-2.518 2.528L24 24.107l-6.22 6.25-2.518-2.518 4.581-4.45h-6.432v-3.59h6.402l-4.551-4.339 2.518-2.579 4.339 4.46V11h3.762v6.341l4.338-4.46 2.518 2.579-4.551 4.339h6.402v3.58z"></path></svg>',
        "linktree":'<svg class="icon-lt" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 80 97.7" style="enable-background:new 0 0 80 97.7;" xml:space="preserve"><path d="M0.2,33.1h24.2L7.1,16.7l9.5-9.6L33,23.8V0h14.2v23.8L63.6,7.1l9.5,9.6L55.8,33H80v13.5H55.7l17.3,16.7l-9.5,9.4L40,49.1 	L16.5,72.7L7,63.2l17.3-16.7H0V33.1H0.2z M33.1,65.8h14.2v32H33.1V65.8z"></path></svg>',
        "twitter":'<i class="project-link-icon fa-brands fa-x-twitter"></i>',
        "discord":'<i class="project-link-icon fa-brands fa-discord"></i>',
        "tg":'<span class="icon-tg"><svg class="icon-tg2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve"><path d="M19.2,4.4L2.9,10.7c-1.1,0.4-1.1,1.1-0.2,1.3l4.1,1.3l1.6,4.8c0.2,0.5,0.1,0.7,0.6,0.7c0.4,0,0.6-0.2,0.8-0.4  c0.1-0.1,1-1,2-2l4.2,3.1c0.8,0.4,1.3,0.2,1.5-0.7l2.8-13.1C20.6,4.6,19.9,4,19.2,4.4z M17.1,7.4l-7.8,7.1L9,17.8L7.4,13l9.2-5.8  C17,6.9,17.4,7.1,17.1,7.4z"/></svg></span>',
        "wechat":'<i class="project-link-icon fa-brands fa-weixin"></i>',
        "github":'<i class="project-link-icon fa-brands fa-github"></i>'
      };
      let descs = {
        "linktree": "LinkTree",
        "twitter": "Twitter/X",
        "discord": "Discord",
        "tg": "Telegram",
        "wechat": "WeChat",
        "github": "GitHub"
      };
      let _links = ``;

      for (let j=0; j<checkLinks.length; j++)
      {
        let _linkName = checkLinks[j];

        let _symbol = symbols[_linkName];
        let _desc = descs[_linkName];

        if (!!_proj[_linkName])
        {
          let _link = String(_proj[_linkName]).trim();
          if (_link.length > 6)
          {
            _links += `
                <div class="project-link-wrapper link-${_linkName}" title="${_desc}">
                  <a href="${_link}" class="project-link">${_symbol}</a>
                </div>
            `;
          }
        }
      }

      let _isViewed = 'scale-in3';
      if (i==0)
      {
        _isViewed = 'scale-in1';
      }
      if (i==1)
      {
        _isViewed = 'scale-in2';
      }

      let _approvedClass = `unapproved`;
      let showApproveButton = true;
      let _approveHtml = `<div class="approval-pending">Approval pending</div>`;
      if (_proj.approved)
      {
        _approvedClass = ``;
        showApproveButton = false;
        _approveHtml = ``;
      } 

      let actionsHtml = ``;
      let showTools = false;
      let showModTools = false;

      if (_user.isLoggedIn())
      {
        
        if (_user.isMod)
        {
          showTools = true;
          showModTools = true;
        } else 
        {
          for (let u=0; u<_proj.users.length; u++)
          {
            let _user1 = _user.username.toLowerCase();
            let _user2 = _proj.users[u].toLowerCase();
            
            if (_user1 == _user2)
            {
              showTools = true;
            }
          }
        }

        if (showTools)
        {
          
          let orderOptionsHtml = ``;
          for (let b=1; b<=9; b++)
          {
            let _selectedOrder = ``;
            if (_order == b)
            {
              _selectedOrder = ` selected`;
            }
            orderOptionsHtml +=` 
                <option value="${b}"${_selectedOrder}>${b}</option>`;

          }
          
          actionsHtml = `
            <div class="project-actions">
              <div class="project-action" onClick="javascript:parseAction('editProject','${_proj.projectId}')">
                <i class="fa-solid fa-wrench"></i>&nbsp;Edit
              </div>
              <div class="project-action" onClick="javascript:parseAction('removeProject','${_proj.projectId}')">
                <i class="fa-solid fa-trash-can"></i>&nbsp;Remove 
              </div>
              
            `;
          if (showModTools)
          {
            actionsHtml += `
              <div class="project-select-wrapper" title="Sort order: 1 as first, 9 as last">
              Sort&nbsp;order: 
                <select class="project-order-select" data-order-select-id="${i}" onChange="javascript:parseAction('editProjectOrder',['${_proj.projectId}',${i}])">
                  ${orderOptionsHtml}    
                </select>
              </div>
            `;
          }
          if (showApproveButton)
          {
            actionsHtml += `
              <div class="project-action" onClick="javascript:parseAction('approveProject','${_proj.projectId}')">
                <i class="fa-solid fa-square-check"></i>&nbsp;Approve
              </div>
            `;
          }
          actionsHtml += `
            </div>
          `;
        };
      }

      projsHtml += `
        <div class="project clearfix ${_approvedClass}" data-isViewed="${_isViewed}">

          <div class="project-website">
            <a class="website-link" title="To project website" target="_blank" href="${_proj.website}"><i class="fa-solid fa-globe"></i>&nbsp;&nbsp;Site&nbsp;&nbsp;<i class="link-out fa-solid fa-arrow-turn-up"></i></a>
          </div>
          <div class="project-logo-wrapper">
            <img class="project-logo" src="${logoUrl}" alt="logo" />
          </div>
          <div class="project-info">

            <div class="project-heading">
              <div class="project-name">
                ${_proj.name}
              </div>
              ${_links}
              <div class="project-cats">
                ${_pcatsHtml}
              </div>
            </div>

            <div class="project-desc">
              ${_proj.desc}
            </div>
            ${_approveHtml}
            ${actionsHtml}
            <div class="project-website-mobile">
              <a class="website-link" title="To project website" target="_blank" href="${_proj.website}"><i class="fa-solid fa-globe"></i>&nbsp;&nbsp;Site&nbsp;&nbsp;<i class="link-out fa-solid fa-arrow-turn-up"></i></a>
            </div>
            
          </div>

        </div>
      `;

    }
  }

  let el = document.getElementById("projects");
  el.textContent = "";
  el.insertAdjacentHTML("beforeend", projsHtml);

  document.querySelectorAll('.project').forEach(el => {
    IObs.observe(el, {});
  });

}

function toggleMenu()
{
  let el = document.getElementById("menu-entries");
  let doShow = true;
  if (el.className != "") 
  {
    doShow = false;
    el.className = "show-menu";
    setTimeout(function() {(doShow) ? el.className="show-menu show-menu2" : el.className=""}, 200);
  } else 
  {
    el.className = "show-menu";
    setTimeout(function() {(doShow) ? el.className="show-menu show-menu2" : el.className=""}, 200);
  }
  
}

function toggleModMenu()
{
  let el = document.getElementById("menu-list-mod");
  let doShow = true;
  if (el.className != "menu-list") 
  {
    doShow = false;
    el.className = "menu-list show-menu";
    setTimeout(function() {(doShow) ? el.className="menu-list show-menu show-menu2" : el.className="menu-list"}, 200);
  } else 
  {
    el.className = "menu-list show-menu";
    setTimeout(function() {(doShow) ? el.className="menu-list show-menu show-menu2" : el.className="menu-list"}, 200);
  }
  
}

function getRandomInt(max) 
{
  return Math.floor(Math.random() * max);
}

function getRandomNumber(numbers)
{
  let str = '';
  for (let i=0; i<numbers; i++)
  {
    str += '' + getRandomInt(9);
  }
  return str;
}


async function getList(list)
{
  let url, postData, data, div, divCat, _cats, _cat, divProj, i, j, k;

  switch (list)
  {
    case 'mods': 
      // get data
      url = getHandlerURL();
      postData = {'req': 'modsList'};
      data = await makePost(url, postData);
      console.log(`getList[${list}]: data:`, data);

      if (!isArray(data.data) || ("error" in data))
      {
        console.log(`getList[${list}]: invalid data`);
        // TODO: Error
        return;
      }

      div = `<h3 class="popup-header">Moderators</h3>`;

      // form a list
      div += `<table class="list" cellpadding=0 cellspacing=0>`;
      for (i=0; i<data.data.length; i++)
      {
        let arr = data.data[i];
        console.log(`data:${i}:`, arr);
        if (!arr.username)
        {
          continue;
        }
        const user = arr.username;
        let removeModStr = `
            <div class="list-button-alert" onClick="javascript:parseAction('removeMod','${user}')">
              <i class="fa-solid fa-trash-can"></i> Remove 
            </div>`;
        if (user == _user.username)
        {
          removeModStr = ``;
        }
        let rowClass = 'list-row';
        if (i%2==1)
        {
          rowClass = 'list-row-odd';
        }
        let email = String(arr.email);
        
        // TODO: will need a page reload after mod removal finished
        div += `
          <tr class="${rowClass}">
            <td>
              ${user}
            </td>
            <td>
              ${email}
            </td>
            <td>
              ${removeModStr}
            </td>
          </tr>`;
      }

      div += `
        </table>`;

      // add a mod button which creates a popup with text input and validator/adder
      // TODO: will need a page reload after finished

      div += `
        <div class="button add-top-margin" onClick="javascript:getForm('addMod');">
          <i class="fa-solid fa-user-plus"></i> Add a Mod
        </div>`;

      //console.log(div);
      popup.open(1, div);

    break;

    case 'projects': // Possibility also to add/modify/remove project(s)
      // get data
      url = getHandlerURL();
      postData = {'req': 'projectsList'};
      data = await makePost(url, postData);
      console.log(`getList[${list}]: data:`, data);

      if (!isArray(data.data) || ("error" in data))
      {
        console.log(`getList[${list}]: invalid data`);
        // TODO: Error
        return;
      }

      // present the data
      
      divCat = ``;
      div = ``;

      _projects = [];
      _projectCategories = [];

      let _projCats = [];

      for (i=0; i<data.data.length; i++)
      {
        let arr = data.data[i];
        console.log(`data:${i}:`, arr);
        if (!arr.name)
        {
          // Invalid entry, skipping
          continue;
        }
        _cats = arr.categories;

        if (!!_cats)
        {
          for (j=0; j<_cats.length; j++)
          {
            _cat = _cats[j];
            if (!_projCats.includes(_cat))
            {
              _projCats.push(_cat);
            }
          }
        }
      }

      _projectCategories = _projCats.sort();
      console.log(_projectCategories);

      _projects = data.data;
      console.log(_projects);

      viewProjects();
      
      // view the data
      break;

    case 'metrics': // Possibility also to add/modify/remove metric(s)
      // get data
      url = getHandlerURL();
      postData = {'req': 'metricsList'};
      data = await makePost(url, postData);
      console.log(`getList[${list}]: data:`, data);

      if (!isArray(data.data) || ("error" in data))
      {
        console.log(`getList[${list}]: invalid data`);
        // TODO: Error
        return;
      }
      dataForEdit["metrics"] = data.data;

      div = `<h3 class="popup-header">Metrics</h3>`;

      // form a list
      div += `<table class="list" cellpadding=0 cellspacing=0>`;
      for (i=0; i<data.data.length; i++)
      {
        let arr = data.data[i];
        console.log(`data:${i}:`, arr);
        if (!arr.creationDate)
        {
          continue;
        }
        const _id = arr.creationDate;
        let removeStr = `
            <div class="list-button-alert" onClick="javascript:parseAction('editMetric','${_id}')">
              <i class="fa-solid fa-wrench"></i>&nbsp;Edit
            </div>
            <div class="list-button-alert" onClick="javascript:parseAction('removeMetric','${_id}')">
              <i class="fa-solid fa-trash-can"></i>&nbsp;Remove 
            </div>`;
        let rowClass = 'list-row';
        if (i%2==1)
        {
          rowClass = 'list-row-odd';
        }
        
        // TODO: will need a page reload after mod removal finished
        div += `
          <tr class="${rowClass}">
            <td>
              ${arr.heading}
            </td>
            <td>
              ${arr.metric}
            </td>
            <td>
              ${removeStr}
            </td>
          </tr>`;
      }

      div += `
        </table>`;

      // add a mod button which creates a popup with text input and validator/adder
      // TODO: will need a page reload after finished

      div += `
        <div class="button add-top-margin" onClick="javascript:getForm('addMetric');">
          <i class="fa-solid fa-circle-plus"></i> Add a Metric
        </div>`;

      //console.log(div);
      popup.open(1, div);
      break;

    case 'helpers': // Possibility also to add/modify/remove helpers(s)
      // get data
      url = getHandlerURL();
      postData = {'req': 'helpersList'};
      data = await makePost(url, postData);
      console.log(`getList[${list}]: data:`, data);

      if (!isArray(data.data) || ("error" in data))
      {
        console.log(`getList[${list}]: invalid data`);
        // TODO: Error
        return;
      }
      dataForEdit["helpers"] = data.data;

      div = `<h3 class="popup-header">Helpers</h3>`;

      // form a list
      div += `<table class="list" cellpadding=0 cellspacing=0>`;
      for (i=0; i<data.data.length; i++)
      {
        let arr = data.data[i];
        console.log(`data:${i}:`, arr);
        if (!arr.creationDate)
        {
          continue;
        }
        const _id = arr.creationDate;
        let removeStr = `
            <div class="list-button-alert" onClick="javascript:parseAction('editHelper','${_id}')">
              <i class="fa-solid fa-wrench"></i> Edit
            </div>
            <div class="list-button-alert" onClick="javascript:parseAction('removeHelper','${_id}')">
              <i class="fa-solid fa-trash-can"></i> Remove 
            </div>`;
        let rowClass = 'list-row';
        if (i%2==1)
        {
          rowClass = 'list-row-odd';
        }
        
        // TODO: will need a page reload after mod removal finished
        div += `
          <tr class="${rowClass}">
            <td>
              ${arr.headline}
            </td>
            <td>
              ${arr.desc}
            </td>
            <td>
              ${(arr.link) ? "link: "+ arr.link : "onClick: " + arr.onclick}
            </td>
            <td>
              ${removeStr}
            </td>
          </tr>`;
      }

      div += `
        </table>`;

      // add a mod button which creates a popup with text input and validator/adder
      // TODO: will need a page reload after finished

      div += `
        <div class="button add-top-margin" onClick="javascript:getForm('addHelper');">
          <i class="fa-solid fa-circle-plus"></i> Add a Helper
        </div>`;

      //console.log(div);
      popup.open(1, div);
      break;

    case 'datasources': // Possibility also to add/modify/remove datasource(s)
      // get data
      url = getHandlerURL();
      postData = {'req': 'datasourcesList'};
      data = await makePost(url, postData);
      console.log(`getList[${list}]: data:`, data);

      if (!isArray(data.data) || ("error" in data))
      {
        console.log(`getList[${list}]: invalid data`);
        // TODO: Error
        return;
      }

      div = `<h3 class="popup-header">Datasources</h3>`;

      // form a list
      div += `<table class="list" cellpadding=0 cellspacing=0>`;
      dataForEdit["datasources"] = data.data;

      for (i=0; i<data.data.length; i++)
      {
        let arr = data.data[i];
        console.log(`data:${i}:`, arr);
        if (!arr.dsid)
        {
          continue;
        }
        const _id = arr.dsid;
        let removeStr = `
            <div class="list-button-alert" onClick="javascript:parseAction('editDatasource','${_id}')">
              <i class="fa-solid fa-wrench"></i> Edit
            </div>
            <div class="list-button-alert" onClick="javascript:parseAction('removeDatasource','${_id}')">
              <i class="fa-solid fa-trash-can"></i> Remove
            </div>
        `;
        let rowClass = 'list-row';
        if (i%2==1)
        {
          rowClass = 'list-row-odd';
        }
        
        // TODO: will need a page reload after mod removal finished
        div += `
          <tr class="${rowClass}">
            <td>
              ${arr.name}
            </td>
            <td>
              ${arr.url}
            </td>
            <td>
              ${removeStr}
            </td>
          </tr>`;
      }

      div += `
        </table>`;

      // add a mod button which creates a popup with text input and validator/adder
      // TODO: will need a page reload after finished

      div += `
        <div class="button add-top-margin" onClick="javascript:getForm('addDatasource');">
          <i class="fa-solid fa-circle-plus"></i> Add a Datasource
        </div>`;

      //console.log(div);
      popup.open(1, div);
      break;

    default:
      console.log("Error: getList: No list defined. Aborting.");
  }
}

function handleAddProject()
{
  if (!_user.username)
  {
    console.log("handleAddProject: not-logged-in");
    let el = document.getElementById("login-button");
    el.click();
    return;
  }
  console.log("handleAddProject: logged-in");
  getForm('addProject');
}

function showError(err, asAlert = true, userErr = "Some Internal error happened. Please try again.")
{  
  let _err = '';

  console.log(err);
  if (asAlert)
  {
    if (!userErr)
    {
      _err = err;
      //alert(err);
    } else 
    {
      _err = userErr;
      //alert(userErr);
    }
  }

  let div = `
      <h3 class="popup-header-error">⚠️ Error</h3>
      <div class="popup-error">
        ${_err}
      </div>
  `;

  popup.open(4, div);
}

function showNotice(consoleInfo, msg)
{
  console.log(consoleInfo);
  //alert(msg);

  let div = `
      <h3 class="popup-header-notice">ℹ️ Notice</h3>
      <div class="popup-notice">
        ${msg}
      </div>
  `;

  popup.open(4, div);
}

async function getCategories(projectId=null)
{
  _categoriesList = ["DeFi", "Infra", "Gaming", "NFT", "Community", "Meme", "Social", "Privacy", "Tooling", "Wallet", "Bridge", "DEX", "CEX"];

  let projectCat = [];
  // TODO: get categories from handler
  projectCat = _projectCategories;


  return {"all": _categoriesList, "proj": projectCat};
}

async function getDatasourcesWithData()
{
  let url = getHandlerURL();
  let postData = {'req': 'datasourcesListData'};
  let data = await makePost(url, postData);
  console.log(`getDatasources: data:`, data);

  if (!data.data || !isObject(data.data) || ("error" in data))
  {
    console.log(`getDatasources: invalid data`);
    // TODO: Error
    return;
  }

  return data;

}

function isObject(obj)
{
  return (typeof obj === 'object' && !isArray(obj) && obj !== null);
}

function categoriesEnable(formNumber, fieldName, jsonData)
{
  console.log("categoriesEnable:", formNumber, fieldName, jsonData);
  // populate category elements
  let el_catAdded =  document.querySelector(`[data-form="${formNumber}"][data-categories-added="${fieldName}"]`);
  let el_catToAdd = document.querySelector(`[data-form="${formNumber}"][data-categories-to-add="${fieldName}"]`);

  _categories = [];
  if ("all" in jsonData)
  {
    _categories = jsonData.all;
  }

  let _added = [];
  if ("proj" in jsonData)
  {
    //_added = jsonData.proj;
    for (let i=0; i<jsonData.proj.length; i++)
    {
      let cat = String(jsonData.proj[i]).trim();
      let lcat = cat.toLowerCase();
      let found = false;
      for (let j=0; j<_categories.length; j++)
      {
        let ltcat = String(_categories[j]).trim().toLowerCase();
        if (ltcat == lcat)
        {
          found = true;
          break;
        }
      }
      if (!found)
      {
        _categories.push(cat);
      }
    }
  }

  _categories = _categories.sort();

  let haveAdded = (_added.length > 0);

  for (let i=0; i<_categories.length; i++)
  {
    let cat = _categories[i];
    if (haveAdded)
    {
      // TODO: added categories (when editing projects)
    }
    let _cat = html_encode(cat);
    let html = `
      <div class="addable-category-tag" data-form="${formNumber}" data-add-category="${fieldName}" data-category-value="${_cat}" onClick="javascript:addCategory(${formNumber},'${fieldName}', '${_cat}')">
        <i class="fa-solid fa-circle-plus"></i>
        ${_cat}
      </div>
    `;
    el_catToAdd.insertAdjacentHTML("beforeend", html); 
  }

}

function categoriesValuesAdd(formNumber, fieldName, valueData)
{
  console.log("categoriesValuesAdd:", formNumber, fieldName, valueData);
  
  let valueArr = String(valueData).split(",");
  for (let i=0; i<valueArr.length; i++)
  {
    let value = valueArr[i];
    if (value.trim() != "")
    {
      addCategory(formNumber, fieldName, value);
    }
  }
}

function metricsEnable(formNumber, fieldName, jsonData)
{
  console.log("metricsEnable:", formNumber, fieldName, jsonData);
  // populate category elements
  let el_metToAdd = document.querySelector(`[data-form="${formNumber}"][data-metrics-to-add="${fieldName}"]`);

 
  if (!isObject(jsonData.data) || !isArray(jsonData.data.datasources) || !isArray(jsonData.data.datas))
  {
    console.log("metricsEnable:Error:Invalid JSON data");
    return;
  }

  // get only meaningful data for the metrics from datasource data
  iterateDatasourcesWithData(jsonData.data.datasources, jsonData.data.datas, formNumber, fieldName, true);

  if (_metricsHtml.length == 0)
  {
    console.log("metricsEnable:No datasources/datas");
    return;
  }
  for (let i = 0; i<_metricsHtml.length; i++)
  {
    let html = _metricsHtml[i];

    el_metToAdd.insertAdjacentHTML("beforeend", html); 
  }

  /*
    let _d;

    for (let key in jsonData.data.datasources)
    {
      let datasource = jsonData.data.datasources[key];
      let data = {};
      let _html = ``;
      _metrics = {};
      
      if (jsonData.data.datas[key])
      {
        data = jsonData.data.datas[key];
      } else 
      {
        console.log(`metricsEnable:Error:Datasource ${datasource.name}:No data`);
      }
      console.log("metricsEnable:datasource:", datasource);
      console.log("metricsEnable:data:", data);
      
      let dsid = datasource.dsid;

      iterateDatasourceObject(data.data, dsid);

      for(let path in _metrics)
      {
        _d = _metrics[path];
        _html += makeMetricEntry(formNumber, fieldName, path, _d);
      }

      _allMetrics[dsid] = _metrics;

      let _met = html_encode(datasource.name);
      let html = `
        <div class="addable-metric-group">
          <div class="addable-metric-heading">${_met}</div>
          ${_html}
        </div>
      `;

      el_metToAdd.insertAdjacentHTML("beforeend", html); 

    }
  */

}

function iterateDatasourcesWithData(datasources, datas, formNumber=null, fieldName=null, withHtml=false)
{
  let _d;

  _allMetrics = {};
  _metrics = {};
  _metricsHtml = [];


  for (let key in datasources)
  {
    let datasource = datasources[key];
    let data = {};
    let _html = ``;
    _metrics = {};
    
    if (datas[key])
    {
      data = datas[key];
    } else 
    {
      console.log(`iterateDatasourcesWithData:Error:Datasource ${datasource.name}:No data`);
    }
    console.log("iterateDatasourcesWithData:datasource:", datasource);
    console.log("iterateDatasourcesWithData:data:", data);
    
    let dsid = datasource.dsid;

    iterateDatasourceObject(data.data, dsid);

    _allMetrics[dsid] = _metrics;


    if (withHtml)
    { 
      for(let path in _metrics)
      {
        _d = _metrics[path];
        _html += makeMetricEntry(formNumber, fieldName, path, _d);
      }

      let _met = html_encode(datasource.name);
      let html = `
        <div class="addable-metric-group">
          <div class="addable-metric-heading">${_met}</div>
          ${_html}
        </div>
      `;

      _metricsHtml.push(html);

    }

    // el_metToAdd.insertAdjacentHTML("beforeend", html); 

  }

  return _allMetrics;

}

// html encodes a string (casts)
function html_encode(str)
{
  var el = document.createElement("p");
  el.innerText = el.textContent = String(str);
  let encoded = el.innerHTML;
  return encoded;
}

function addCategory(formNumber, fieldName, catName)
{
  // populate category elements
  let el_catAdded =  document.querySelector(`[data-form="${formNumber}"][data-categories-added="${fieldName}"]`);
  let el_cat = document.querySelector(`[data-form="${formNumber}"][data-add-category="${fieldName}"][data-category-value="${catName}"]`);
  
  let _cat = catName;

  let html = `
      <div class="added-category-tag" data-form="${formNumber}" data-added-category="${fieldName}" data-category-value="${_cat}" onClick="javascript:removeCategory(${formNumber},'${fieldName}', '${_cat}', true)">
        <i class="fa-solid fa-circle-xmark"></i>
        ${_cat}
      </div>
  `;
  el_catAdded.insertAdjacentHTML("beforeend", html); 

  el_cat.classList.remove("hidden");
  el_cat.classList.add("hidden");

}

function addCategoryUser(formNumber, fieldName, value)
{
  // populate category elements
  let el_catAdded =  document.querySelector(`[data-form="${formNumber}"][data-categories-added="${fieldName}"]`);
  let el_catInput = document.querySelector(`[data-form="${formNumber}"][data-input-text="${fieldName}"]`);

  // let _val = el_catInput.value;

  // TODO: validate input
  let arr = parseCategoryName(value);
  let ret = arr[0];
  let val = arr[1];
  let flag = arr[2];

  if (!ret)
  {
    showError('addCategoryUser:' + val, true, val);
    return;
  }

  let _cat = val;

  let strExisting = 'false';

  if (flag)
  {
    // it's an already existing category
    strExisting = 'true';
  }
  let html = `
      <div class="added-category-tag" data-form="${formNumber}" data-added-category="${fieldName}" data-category-value="${_cat}" onClick="javascript:removeCategory(${formNumber},'${fieldName}','${_cat}',${strExisting})">
        <i class="fa-solid fa-circle-xmark"></i>
        ${_cat}
      </div>
  `;
  el_catAdded.insertAdjacentHTML("beforeend", html); 

  if (flag)
  {
    let el_cat = document.querySelector(`[data-form="${formNumber}"][data-add-category="${fieldName}"][data-category-value="${_cat}"]`);

    el_cat.classList.remove("hidden");
    el_cat.classList.add("hidden");
  }

}

function removeCategory(formNumber, fieldName, catName, doAdd=false)
{
  let el_cat = document.querySelector(`[data-form="${formNumber}"][data-added-category="${fieldName}"][data-category-value="${catName}"]`);

  if (doAdd)
  {
    let el_cat2 = document.querySelector(`[data-form="${formNumber}"][data-add-category="${fieldName}"][data-category-value="${catName}"]`);

    //console.log("el_cat2:", el_cat2);

    el_cat2.classList.remove("hidden");
  }
  el_cat.remove();
}

async function populateForm(formObj, layer=1)
{
  /*
    formObj:
    - handler_endpoint,
    - [fields]
  */
  if (!("fields" in formObj) || !("handler" in formObj))
  {
    showError("Error: populateForm: Malformed formObj.");
    console.log("formObj:", formObj);
  }

  formObj.layer = layer;

  let formNumber = addFormToForms(formObj);

  let str = `
      <div class="form" data-form="${formNumber}">`;

  let _jsonData, _jsonDataType, _fieldName, _valueData;

  for (let i=0; i<formObj.fields.length; i++)
  {
    let j, k;

    let field = formObj.fields[i];

    let empty = ``;
    if ("empty" in field && field.empty == false)
    {
      empty = ` <abbr title="This field must be filled/set">*</abbr>`;
    }

    let jsonData;

    let fieldDesc = field.desc + empty;

    switch (field.type)
    {

      case 'heading':
        str += `
        <h3>${fieldDesc}</h3>
        `;
        break;

      case 'name':
      case 'dsid':
      case 'httpauth':
        str += `
        <div class="input-text" data-form="${formNumber}" data-input-wrapper="${field.name}">
          <div class="name" data-form="${formNumber}" data-input-name="${field.name}">${fieldDesc}</div>
          <div class="input-div">
            <input class="input" type="text" data-form="${formNumber}" data-input-text="${field.name}" value="${field.value}" />
          </div>
        </div>
        `;
        break;

      case 'enum':
        let _opts = ``;
        let _defOpt = field.defaultOption;
        let _selValue = field.value;
        if (!_selValue || _selValue == '')
        {
          _selValue = _defOpt;
        }

        for (j=0; j<field.options.length; j++)
        {
          let _sel = ``;
          let _opt = field.options[j];
          if (_opt == _selValue)
          {
            _sel = `selected`;
          }
          _opts += `
              <option value="${_opt}" ${_sel}>${_opt}</option>
          `
        }
        str += `
        <div class="input-select" data-form="${formNumber}" data-input-wrapper="${field.name}">
          <div class="url" data-form="${formNumber}" data-input-name="${field.name}">${fieldDesc}</div>
          <div class="input-select-div">
            <select class="select" data-form="${formNumber}" data-input-text="${field.name}">
              ${_opts}          
            </select>
          </div>
        </div>
        `;
        break;

      case 'singlebox':
        str += `
        <div class="input-text" data-form="${formNumber}" data-input-wrapper="${field.name}">
          <div class="url" data-form="${formNumber}" data-input-name="${field.name}">${fieldDesc}</div>
          <div class="input-div">
            <input class="checkbox-input" type="checkbox" data-form="${formNumber}" data-input-text="${field.name}" value="${field.value}" /> ${field.value}
          </div>
        </div>
        `;
        break;

      case 'logoImage':
        str += `
        <div class="input-text" data-form="${formNumber}" data-input-wrapper="${field.name}">
          <div class="url" data-form="${formNumber}" data-input-name="${field.name}">${fieldDesc}</div>
          <div class="input-div">
            <input class="input" type="file" data-form="${formNumber}" data-input-text="${field.name}" value="${field.value}" accept="image/webp, image/jpeg, image/png, image/svg" />
          </div>
        </div>
        `;
        break;    

      case 'logoUrl':
        str += `
        <div class="input-text" data-form="${formNumber}" data-input-wrapper="${field.name}">
          <div class="url" data-form="${formNumber}" data-input-name="${field.name}">${fieldDesc}</div>
          <div class="input-div">
            <input class="input" type="text" data-form="${formNumber}" data-input-text="${field.name}" value="${field.value}" />
          </div>
        </div>
        `;
        break;        
  

      case 'url':
        str += `
        <div class="input-text" data-form="${formNumber}" data-input-wrapper="${field.name}">
          <div class="url" data-form="${formNumber}" data-input-name="${field.name}">${fieldDesc}</div>
          <div class="input-div">
            <input class="input" type="text" data-form="${formNumber}" data-input-text="${field.name}" value="${field.value}" />
          </div>
        </div>
        `;
        break;        

      case 'longtext':
      case 'json':  
        str += `
        <div class="input-textarea" data-form="${formNumber}" data-input-wrapper="${field.name}">
          <div class="longtext" data-form="${formNumber}" data-input-name="${field.name}">${fieldDesc}</div>
          <div class="input-textarea-div">
            <textarea class="textarea" data-form="${formNumber}" data-input-text="${field.name}">${field.value}</textarea>
          </div>
        </div>
        `;
        break;

      case 'metric':  
        // TODO:
        // - Add datasources "picker" + download datasources
        // - Make metric validator

        _jsonData = await getDatasourcesWithData();
        _jsonDataType = field.type;
        _fieldName = field.name;

        str += `
        <div class="input-textarea" data-form="${formNumber}" data-input-wrapper="${field.name}">
          <div class="longtext" data-form="${formNumber}" data-input-name="${field.name}">${fieldDesc}</div>
          <div class="input-textarea-div">
            <textarea class="textarea" data-form="${formNumber}" data-input-text="${field.name}" onkeyup="javascript:metricsHandle(${formNumber}, '${field.name}');">${field.value}</textarea>
          </div>
        </div>
        <div class="metrics-wrapper clearfix">
          <div class="metrics-heading">
            Addable Metrics
          </div>
          <div class="metrics-to-add-wrapper" data-form="${formNumber}" data-metrics-to-add="${field.name}"></div>
          </div>
        </div>
        `;
        break;


      case 'categories':

        _jsonData = await getCategories();
        _jsonDataType = field.type;
        _fieldName = field.name;
        _valueData = field.value;

        str += `
        <div class="input-text" data-form="${formNumber}" data-input-wrapper="${field.name}">
          <div class="name" data-form="${formNumber}" data-input-name="${field.name}">${fieldDesc}</div>
          <div class="input-div">
            <input class="input" type="text" data-form="${formNumber}" data-input-text="${field.name}" value="" onkeyup="javascript:categoryHandle(${formNumber}, '${field.name}');" />
          </div>
          <div class="categories-wrapper clearfix">
            <div class="categories-added-wrapper">
              <div class="cat-heading">
                Categories Added
              </div>
              <div data-form="${formNumber}" data-categories-added="${field.name}" class="categories-added"></div>
            </div>
            <div class="categories-to-add-wrapper">
              <div class="cat-heading">
                Addable Categories 
              </div>
              <div class="categories-to-add" data-form="${formNumber}" data-categories-to-add="${field.name}"></div>
            </div>
          </div>
        </div>
        `;
        break;

      case 'githubUser':
        str += `
        <div class="input-text" data-form="${formNumber}" data-input-wrapper="${field.name}">
          <div class="name" data-form="${formNumber}" data-input-name="${field.name}">${fieldDesc}</div>
          <div class="input-div">
            <input class="input" type="text" data-form="${formNumber}" data-input-text="${field.name}" value="${field.value}" />
          </div>
        </div>
        `;
        break;

      case 'email':
        str += `
        <div class="input-text" data-form="${formNumber}" data-input-wrapper="${field.name}">
          <div class="name" data-form="${formNumber}" data-input-name="${field.name}">${fieldDesc}</div>
          <div class="input-div">
            <input class="input" type="text" data-form="${formNumber}" data-input-text="${field.name}" value="${field.value}" />
          </div>
        </div>
        `;
        break;
    }
  }

  str += `
        <div class="submit-button add-top-margin" data-submit="${formNumber}" onClick="javascript:handleForm('${formNumber}')">
          ${formObj.submitButtonText}
        </div>
  `;

  str += `
      </div>
      `;

  //console.log(str);

  popup.open(layer, str);

  if (_jsonData)
  {
    if (_jsonDataType == 'metric')
    {
      metricsEnable(formNumber, _fieldName, _jsonData);
    }

    if (_jsonDataType == 'categories')
    {
      categoriesEnable(formNumber, _fieldName, _jsonData);
      categoriesValuesAdd(formNumber, _fieldName, _valueData);
    }
  }
}

function makeMetricPath(arr)
{
  if (!arr || !isArray(arr))
  {
    console.log("makeMetricPath:Error:Not an array", arr);
    return null;
  }

  return arr.join('.');
}

function iterateDatasourceObject(obj, path)
{
  for (let key2 in obj)
  {
    let _d = obj[key2];
    let _path = makeMetricPath([path, key2])

    if (_d)
    {
      if (isObject(_d))
      {
        iterateDatasourceObject(_d, _path);
      } else if (isArray(_d))
      {
        iterateDatasourceArray(_d, makeMetricPath([path, key2]));
      } else 
      {
        _metrics[_path] = _d;
      }
    }
  }
}

function iterateDatasourceArray(arr, path)
{
  for (let i=0; i<arr.length; i++)
  {
    let key2 = i;
    let _d = arr[key2];
    let _path = makeMetricPath([path, key2])

    if (_d)
    {
      if (isObject(_d))
      {
        iterateDatasourceObject(_d, _path);
      } else if (isArray(_d))
      {
        iterateDatasourceArray(_d, _path);
      } else 
      {
        _metrics[_path] = _d;
      }
    }
  }
}


function makeMetricEntry(formNumber, fieldName, _name, _value)
{

  let name = html_encode(_name);
  let value = html_encode(_value);

  return `
        <div class="addable-metric-tag" data-form="${formNumber}" data-add-metric="${fieldName}" data-metric-value="${name}" onClick="javascript:addMetric(${formNumber},'${fieldName}', '${name}')" title="${name} = ${value}">
          <i class="fa-solid fa-circle-plus"></i>&nbsp;${name}
        </div>
  `;
}

function categoryHandle(formNumber, fieldName)
{
  let el = document.querySelector(`[data-form="${formNumber}"][data-input-text="${fieldName}"]`);
  let _val = String(el.value).trim();
  let __val = _val.replace(/[^A-Za-z0-9\ \,-]/g, '');
  el.value = __val;
  if (__val.includes(","))
  {
    let arr = __val.split(",");
    for (let i=0; i<(arr.length-1); i++)
    {
      let _aval = arr[i];
      addCategoryUser(formNumber, fieldName, _aval);
    }
    el.value = arr[arr.length-1];
  }

}

function metricsHandle(formNumber, fieldName)
{
  let el = document.querySelector(`[data-form="${formNumber}"][data-input-text="${fieldName}"]`);
  let _val = String(el.value).trim();
  let __val = _val.replace(/[^A-Za-z0-9\ \,-]/g, '');
  el.value = __val;
  if (__val.includes(","))
  {
    let arr = __val.split(",");
    for (let i=0; i<(arr.length-1); i++)
    {
      let _aval = arr[i];
      addCategoryUser(formNumber, fieldName, _aval);
    }
    el.value = arr[arr.length-1];
  }

}

function addMetric(formNumber, fieldName, metVal)
{
  // populate category elements
  let el = document.querySelector(`[data-form="${formNumber}"][data-input-text="${fieldName}"]`);

  let val = el.value;

  val += " {" + metVal + "}";
   
  el.value = val;


}

function usleep(ms)
{
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getImageDimensions(imageURL)
{
  let dimArray; 
  try {
    dimArray = await _getImageDim(imageURL);
  } catch(e)
  {
    console.log("_getImageDim threw error:", e);
  }

  console.log("getImageDimensions X Y:", dimArray);

  if (!dimArray)
  {
    console.log("getImageDimensions: Invalid image in image-link");
    return [false, "Logo link does not contain a valid image"];
  }  

  let width = dimArray[0];
  let height = dimArray[1];

  if (width !== height)
  {
    console.log("getImageDimensions: Invalid image dimensions. Not a square image");
    return [false, "Logo image is not a square. Please provide a square image"];
  }

  if (width < 32)
  {
    console.log("getImageDimensions: Invalid image dimensions. Image too small");
    return [false, "Logo image is too small. Please provide larger image (bigger than 32x32)"];
  }

  console.log("getImageDimensions: ok");
  return [true, null];
}

function _getImageDim(src)
{
  return new Promise((resolve, reject) => {
    let img = new Image()
  
    img.onload = function() {
      console.log("_getImageDim:data:", img);
      resolve([img.width,img.height]);
    }
    img.onerror = reject
    img.src = src
  
  });
}


function projectSearch()
{
	let input = document.getElementById("projects-search-input");
	let search = input.value.toLowerCase().trim();
  if (!search || search.length == 0)
  {
    // show all projects without search
    viewProjects();
    return;
  }
	var i, j, k, l;
  let searchableKeys = [
    'name',
    'categories',
    'desc',
  ];

  let filterArr = search.split(" ");

  let foundProjects = [];

  for (i = 0; i < _projects.length; i++) 
	{
		let project = _projects[i];
		let found = false;
    for (j = 0; j<searchableKeys.length; j++)
    {
      if (found)
      {
        break;
      }
      let key = searchableKeys[j];
      let _data = project[key];
      if (!_data)
      {
        continue;
      }
      if (isArray(_data))
      {
        // If array
        for (k=0; k<_data.length; k++)
        {
          if (found)
          {
            break;
          }
          let data = String(_data[k]).toLowerCase();
          for (l=0; l<filterArr.length; l++)
          {
            let filter = String(filterArr[l]).toLowerCase();
            if (data.indexOf(filter) > -1) 
            {
              found = true;
              
              break;
            }
          }
          
        }
        continue;
      } else
      {
        // If String
        let data = String(_data).toLowerCase();
        for (l=0; l<filterArr.length; l++)
        {
          let filter = String(filterArr[l]).toLowerCase();
          if (data.indexOf(filter) > -1) 
          {
            found = true;
            
            break;
          }
        }
      }

    }

    if (!found)
    {
      continue;
    }
    
    foundProjects.push(project);
    
  }

	viewProjects(null, foundProjects);
	
}

function addFormToForms(formObj)
{
  forms.push(formObj);
  return getLastFormNumber();
}

function getLastFormNumber()
{
  return forms.length - 1;
}

function parseCategoryName(value)
{
  let _val = String(value).trim();
  let __val = _val.replace(/[^A-Za-z0-9\ -]/g, '');
  if (__val != _val || __val.length < 3 || __val.length > 25 || strChar(__val, 0) == "-")
  {
    return [false, "Error with category name! Characters -, A-Z, 0-9 and spaces only allowed for category name and name can be 3-24 characters long.", null];
  }
  let _cat = null;

  for (let i=0; i<_categoriesList; i++)
  {
    let _cate = String(_categoriesList[i]);
    let _lcat = _cate.toLowerCase();
    let _lval = __val.toLowerCase();
    if (_lcat == _lval)
    {
      _cat = _cate;
      break;
    }
  }

  if (!!_cat)
  {
    return [true, _cat, true];
  } 

  return [true, __val, false];
  


}

async function handleForm(formNumber)
{
  /*
    get formNumber# from forms
  */
  if (!forms[formNumber])
  {
    showError("Error: handleForm: Cant get active form data: Aborting.");
    return;
  }

  let formObj = forms[formNumber];

  // handle form
  console.log(formObj);

  let i,j,k,els,el,val,field,_val,isEmpty,_found;
  

  let vals = {};
  let filevals = [];
  if (formObj.postData)
  {
    vals = formObj.postData;
  }

  let emptyAlts = {};
  let wasEmptyAlt = {};
  let checkedImageUpdate = false;
  let isEditMode = false;

  if (formObj.fields && formObj.fields.length > 0)
  {
    for (i=0; i<formObj.fields.length; i++)
    {
      isEmpty = false;
      field = formObj.fields[i];
      console.log(field);

      switch (field.type)
      {
        case 'githubUser':
        case 'logoUrl':
        case 'email':
        case 'url':
        case 'name':
        case 'longtext':
        case 'enum':
        case 'httpauth':
        case 'dsid':
        case 'json':
        case 'metric':

          el = document.querySelector(`[data-form="${formNumber}"][data-input-text="${field.name}"]`);
    
          _val = el.value.trim();
          console.log(`handleForm:field.type:${field.type}:from:${el.value}:to:${_val}`);

          isEmpty = (_val.length == 0);

          if (field.emptyalt)
          {
            emptyAlts[field.name] = field;
            wasEmptyAlt[field.name] = isEmpty;
          }

          if (field.empty == false && isEmpty)
          {
            showError(`handleForm:${field.type}:value:empty`, true, `${field.shortdesc} must be filled/set`)
            return;
          }          
          break;

        case 'logoImage':
          el = document.querySelector(`[data-form="${formNumber}"][data-input-text="${field.name}"]`);
          isEmpty = (!el.files || !el.files[0]);
          if (field.emptyalt)
          {
            emptyAlts[field.name] = field;
            wasEmptyAlt[field.name] = isEmpty;
          }

          break;

      }

      
      switch (field.type)
      {

        case 'githubUser':
        
          val = await parseValue(field.type, _val);
          console.log("parseValue:", field.type, val);
          if (!val || val !== _val)
          {
            showError(`handleForm:${field.type}:value:invalid`, true, `${field.desc} has errors. Please input a valid github username`);
            return;
          }
        
          vals[field.name] = val;
          break;

        case 'email':
        
          val = await parseValue(field.type, _val);
          console.log("parseValue:", field.type, val);
          if (!val || val !== _val)
          {
            showError(`handleForm:${field.type}:value:invalid`, true, `${field.desc} has errors. Please input a valid email address`);
            return;
          }
        
          vals[field.name] = val;
          break;


        case 'dsid':
 
          val = await parseValue(field.type, _val);
          console.log("parseValue:", field.type, val);
          if (!val || val !== _val)
          {
            showError(`handleForm:${field.type}:value:invalid`, true, `${field.desc} has errors. Please input a valid Data source ID (allowed: A-Z, 0-9)`);
            return;
          }
        
          vals[field.name] = val;
          break;

        case 'httpauth':

          if (field.empty && isEmpty)
          {
            vals[field.name] = "";
            break;
          }

          val = await parseValue(field.type, _val);
          console.log("parseValue:", field.type, val);
          if (!val || val !== _val)
          {
            showError(`handleForm:${field.type}:value:invalid`, true, `${field.desc} has errors. Please input a valid HTTP Authentication`);
            return;
          }
        
          vals[field.name] = val;
          break;

        case 'enum':
          val = await parseValue(field.type, _val, field);
          console.log("parseValue:", field.type, val);
          vals[field.name] = val;        
          break;
        
        case 'name':
          val = await parseValue(field.type, _val);
          console.log("parseValue:", field.type, val);
          vals[field.name] = val;
          break;

        case 'longtext':
          val = await parseValue(field.type, _val);
          console.log("parseValue:", field.type, val);
          vals[field.name] = val;
          break;

        case 'metric':
          val = await parseValue(field.type, _val);
          console.log("parseValue:", field.type, val);
          vals[field.name] = val;
          break;

        case 'json':
          if (field.empty && isEmpty)
          {
            vals[field.name] = "";
            break;
          }
          val = await parseValue(field.type, _val);
          console.log("parseValue:", field.type, val);
          if (!val)
          {
            console.log(`handleForm:${field.type}:value:invalid`);
            return;
          }
          vals[field.name] = val;
          break;

        case 'logoUrl':

          console.log("parseValue:before:", field.type, _val);
          val = await parseValue(field.type, _val);
          console.log("parseValue:", field.type, val);
          if (!val)
          {
            console.log(`handleForm:${field.type}:value:invalid`);
            //return;
          }
        
          vals[field.name] = val;
          break;

        case 'logoImage':

          console.log("parseValue:before:", field.type, el.files);
          if (!(!el.files || !el.files[0]))
          {
            val = await parseValue(field.type, el.files[0]);
            console.log("parseValue:", field.type, val);
            if (!val)
            {
              console.log(`handleForm:${field.type}:value:invalid1`);
              //return;
            }
          
            filevals.push({"key": field.name, "file": el.files[0], "filename": el.files[0].name});
            //vals[field.name] = val;
          } else 
          {
            console.log(`handleForm:${field.type}:value:invalid2`);
          }
          break;

        case 'singlebox':
          console.log("parseValue:", field.type, el.checked);
          val = el.checked ? field.value : null;
          if (field.name == "logoupdate")
          {
            isEditMode = true;
            checkedImageUpdate = el.checked;
          }
          break;
        
        case 'url':
          if ("empty" in field && field.empty && isEmpty)
          {
            vals[field.name] = '';
            break;
          }

          val = await parseValue(field.type, _val);
          console.log("parseValue:", field.type, val);
          if (!val)
          {
            console.log(`handleForm:${field.type}:value:invalid`);
            return;
          }
        
          vals[field.name] = val;
          break;

        case 'categories':
          console.log(`[data-form="${formNumber}"][data-added-category="${field.name}"]`);
          els = document.querySelectorAll(`[data-form="${formNumber}"][data-added-category="${field.name}"]`);
          console.log(els);
          if (field.empty == false && els.length == 0)
          {
            showError(`handleForm:${field.type}:value:empty`, true, `At least one project category must be added`)
            return;
          }
          let cats = [];
          for (k=0; k<els.length; k++)
          {
            el2 = els[k];
            _val = el2.getAttribute("data-category-value");
            cats.push(_val);
          }
          vals[field.name] = cats;
          break;
      }
      
    }

    // Project Logo / Empty Alternative Fields (One must be filled)
    // + Edit mode upgrade
    if ((isEditMode && checkedImageUpdate) || !isEditMode)
    {
      let _keys = Object.keys(emptyAlts);
      if (_keys.length > 0)
      {
        for (let l=0; l<_keys.length; l++)
        {
          let _key = _keys[l];
          let _field = emptyAlts[_key];
          let wasEmpty = wasEmptyAlt[_key];
          let wasEmpty2 = false;
          if (wasEmptyAlt[_field.emptyalt])
          {
            wasEmpty2 = wasEmptyAlt[_field.emptyalt];
          }
          if (wasEmpty && wasEmpty2)
          {
            showError(`handleForm:${_field.type}:value:empty`, true, `Logo Image or Logo Image URL missing`)
            return;
          }
        }
      }
    }

  }
  console.log(vals);

  let url = formObj.handler;
  let data;

  if (filevals.length == 0)
  {
    // no files
    data = await makePost(url, vals);
  } else 
  {
    // have files
    data = await makePost(url, vals, {}, filevals);
  }
  
  
  if (!data || "error" in data || !data.data)
  {
    showError("Error: handleForm: Got error from handler. Cant get active form data: Aborting.");
    console.log(data.error);
    // error
    return;
  }

  // TODO: success notification! 
  showNotice(`handleForm:${formObj.postData.req}:response:success)`, "Success")

  popup.close(formObj.layer);

  if (formObj.openPage)
  {
    _menu.getPage(formObj.openPage);
  }
  

}

async function parseValue(type, value, field={})
{
  let _val,__val,arr,ret;

  switch (type)
  {
    case 'string':
    case 'longtext':
    case 'metric':
    case 'name':
      _val = String(value).trim();
      return _val;
      break;

    case 'json':
      _val = String(value).trim();
      try {
        let _test = JSON.parse(_val);
      } catch(e)
      {
        showError("parseValue:" + type, true, "Could not parse PostData JSON. Please fix it and try again");
        return null;
      }
      return _val;
      break;      
  
    case 'enum':
      _val = String(value).trim();
      for (let j=0; j<field.options.length; j++)
      {
        let _opt = field.options[j];
        if (_val == _opt)
        {
          return _val;
        }
      }
      if (!_found)
      {
        showError(`parseValue:${field.desc}:${type}:value:invalid`, true, `${field.desc} has errors. Please select a value.`);
        return null;
      }
      break;

    case 'logoImage':
      //_val = String(value).trim();
      try {
        if (!isObject(value))
        {
          return null;
        }
        arr = await getImageDimensionsFromFile(value);
        if (arr[0] == false)
        {
          console.log("parseValue:logoImage:" + arr[1]);
          //showError("parseValue:logoImage:" + arr[1], true, arr[1] + ". Please try again");
          return null;
        }
        return value;
      } catch(e)
      {
        console.log("parseValue:logoImage:getImageDimensionsFromFile threw:", e);
        return null;
      }  

      return value;
      break;

    case 'logoUrl':
      _val = String(value).trim();
      arr = await getImageDimensions(_val);
      if (arr[0] == false)
      {
        console.log("parseValue:logoUrl:" + arr[1]);
        //showError("parseValue:logoUrl:" + arr[1], true, arr[1] + ". Please try again");
        return null;
      }
      return _val;
      break;

    case 'url':
      _val = String(value).trim();
      ret = isValidURL(_val);
      if (!ret)
      {
        showError("parseValue:url:invalid",true, "Link you gave is not valid. Please try again");
        return null;
      }
      return _val;
      break;

    case 'githubUser':
      _val = String(value).trim();
      if (_val.length == 0)
      {
        console.log("e1");
        return null;
      }

      __val = _val.replace(/[^A-Za-z0-9-]/g, '');
      if (__val != _val || __val.length > 39 || strChar(__val, 0) == "-")
      {
        return null;
      }

      return __val;
      break;

    case 'email':
      _val = String(value).trim();
      if (_val.length == 0)
      {
        console.log("e1");
        return null;
      }

      if (!isValidEmail(_val))
      {
        console.log("e2");
        return null;
      }
      
      return _val;
      break;      

    case 'dsid':
      _val = String(value).trim();
      if (_val.length == 0)
      {
        console.log("e1");
        return null;
      }

      __val = _val.replace(/[^A-Za-z0-9]/, '');
      if (__val != _val || __val.length > 8 || !isNaN(strChar(__val, 0)))
      {
        return null;
      }

      return __val;
      break;

    case 'httpauth':
      _val = String(value).trim();
      if (_val.length == 0)
      {
        console.log("e1");
        return null;
      }

      if (_val.length < 3 || !(_val.indexOf(':') > -1) )
      {
        return null;
      }

      return _val;
      break;


  }
  return null;
}

function isValidURL(_url) 
{
  let url;
  
  try {
    url = new URL(_url);
  } catch (_) {
    return false;  
  }

  //return url.protocol === "http:" || url.protocol === "https:";
  return true;
}

function strChar(str, nbr)
{
  return Array.from(str)[nbr];
}

function isValidEmail(email) 
{
  return /\S+@\S+\.\S+/.test(String(email));
}

function str2calc1(_str)
{
  // example:
  // input:  "data1.posStaked/data2.circSupply"
  // output: "${data1.posStaked}/${data2.circSupply}"

  let str = String(_str).replace(/\s/g, '');
  const regexp = /[a-z]+[a-z0-9]*[a-z0-9\.]*/ig;
  return str.replace(regexp, "\${$&}")
}

function getCookie(name) 
{
  let cookies = document.cookie.split(';');
  for (let i=0 ; i < cookies.length ; ++i)
  {
    let arr = cookies[i].trim().split('=');
    
    if (decodeURIComponent(arr[0]) == name)
    {
      return decodeURIComponent(arr[1]);
    }
  }
  return null;
};

function clearCookie(name)
{
  console.log("clearCookie:cookies.before:", document.cookie);
  let enc = encodeURIComponent(name);
  document.cookie = `${enc}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  console.log("clearCookie:cookies.after:", document.cookie);
}

function isArray(obj)
{
  return (obj.constructor === Array);
}

async function connectWallet(net)
{
  /*
    if (typeof ethereum == "undefined")
    {
      showError("connectWallet:metamask not installed", true, "Metamask not installed. Please install it first.");
      return;
    }
    const provider = new ethers.BrowserProvider(ethereum);
  */
 
  try 
  {

    if (!modal)
    {
      showError("WalletConnect: Not ready yet", true, 'The site is not yet ready for you. Please try again in 5 seconds.');
      return;
    }

    const walletProvider = await modal.subscribeProviders((state) => {
      return state["eip155"];
    });

    const addressFrom = await modal.subscribeAccount((state) => {
      return state;
    });

   
    console.log("modal.getIsConnectedState:", modal.getIsConnectedState());
    if (!modal.getIsConnectedState())
    {
      console.log("connectWallet:Opening modal")
      await modal.open();

    }
    
    console.log("modal.getIsConnectedState:", modal.getIsConnectedState());
    if (modal.getIsConnectedState())
    {
      let el = document.getElementById("mainnet-button");
      let el2 = document.getElementById("testnet-button");
      el.setAttribute("onclick", "javascript:connectWalletPhase2('main');")
      el.innerHTML = `Add ESpace Mainnet`;
      el2.setAttribute("onclick", "javascript:connectWalletPhase2('test');")
      el2.innerHTML = `Add ESpace Testnet`;

      connectWalletPhase2(net);
    }

    //connectWalletPhase2(net);

  } catch(e)
  {
    console.log(e);
  }
}

async function connectWalletPhase2(net)
{
  /*
    if (typeof ethereum == "undefined")
    {
      showError("connectWallet:metamask not installed", true, "Metamask not installed. Please install it first.");
      return;
    }
    const provider = new ethers.BrowserProvider(ethereum);
  */
  let walletProvider, provider;

  try 
  {

    if (!modal)
    {
      showError("WalletConnect: Not ready yet", true, 'The site is not yet ready for you. Please try again in 5 seconds.');
      return;
    }

    walletProvider = await modal.subscribeProviders((state) => {
      return state["eip155"];
    });


    //const walletProvider = modal.getWalletProvider();

    if (!walletProvider)
    {
      showError("WalletConnect: Could not get walletProvider", true, 'Could not connect to wallet. Please try again.');
      return;
    }
    console.log("walletProvider:", walletProvider);
    /*
    provider = new ethers.BrowserProvider(walletProvider);
    console.log("provider:",provider);
    if (!provider)
    {
      showError("WalletConnect: Could not get provider", true, 'Could not connect to wallet. Please try again.');
      return;
    }
    */
  } catch(e)
  {
    console.log(e);
  }


  switch(net)
  {
    case 'main':

      try 
      {
        await modal.switchNetwork(_confluxESpace);
        /*
        await provider.send('wallet_addEthereumChain', [{
          chainId: "0x406", // 1030 
          chainName: "Conflux ESpace",
          rpcUrls: [
            "https://evm.confluxrpc.com"
          ],
          nativeCurrency: {
            name: "CFX",
            symbol: "CFX",
            decimals: 18
          },
          blockExplorerUrls: [
            "https://evm.confluxscan.net/"
          ]
        },]);
        */
      } catch(e)
      {
        console.log(e);
      }

      showNotice("connectWallet:mainnet:success", "Conflux ESpace mainnet network added");

      break;

    case 'test':

      try 
      {
        await modal.switchNetwork(_confluxESpaceTestnet);
        /*
          await provider.send('wallet_addEthereumChain', [{
            chainId: "0x47", // 71 
            chainName: "Conflux ESpace Testnet",
            rpcUrls: [
              "https://evmtestnet.confluxrpc.com"
            ],
            nativeCurrency: {
              name: "CFX",
              symbol: "CFX",
              decimals: 18
            },
            blockExplorerUrls: [
              "https://evmtestnet.confluxscan.net/"
            ]
          },]);
        */
      } catch(e)
      {
        console.log(e);
      }
      showNotice("connectWallet:testnet:success", "Conflux ESpace testnet network added");


      break;
  }
}