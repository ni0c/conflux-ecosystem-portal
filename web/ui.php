<?php

//define("UI_VER", "0.1.0");
define("UI_VER", gmdate("U"));
define("WEB_DIR", "../web/");

define("DEBUG_ENABLED", true);

include(WEB_DIR . "funcs.php");

doInit();

renderSite();

function renderSite()
{
    //$dotenvFile = WEB_DIR . ".env";
    //dotenv::init($dotenvFile);

    $cfatoken = dotenv::get("CLOUDFLARE_ANALYTICS_TOKEN");
    define("CLOUDFLARE_ANALYTICS_HTML", '<!-- Cloudflare Web Analytics --><script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon=\'{"token": "'. $cfatoken .'"}\'></script><!-- End Cloudflare Web Analytics -->');

    $handlerUrl = dotenv::get("HANDLER_URL");
    $errorCookie = "errorLoginCookie";
    
    $cid = dotenv::get('GITHUB_OAUTH_CID');

    $pubUrl = dotenv::get("RELATIVE_URL_TO_PUB");

    define("PROJ_NAME", dotenv::get("PROJECT_NAME"));

    // Rendering the site inline
?><!DOCTYPE html>
<html lang="en">
<head>
    <title><?=PROJ_NAME?></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="<?=PROJ_NAME?>" />
    <meta name="keywords" content="Conflux, Ecosystem, CFX, Projects, Statistics, Information" />
    <link rel="shortcut icon" href="ico.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="stylesheet" href="files/normalize.css" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Exo:ital,wght@0,100..900;1,100..900&family=Saira+Semi+Condensed:wght@100;200;300;400;500;600;700;800;900&family=Teko:wght@300..700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />

    <link rel="stylesheet" href="files/style.css?<?=UI_VER?>" />
</head>
<body>

    <div class="menu-extra">
    </div>

    <div class="menu-wrapper">
        <div id="menu">
            <div id="logo"><img src="files/Conflux_Primary_Logo.svg" alt="Conflux" /></div>

            <div id="login">
                <div id="logged-out">
                    <a href="https://github.com/login/oauth/authorize?client_id=<?= $cid ?>&scope=user:read" id="login-button" class="button">
                        <i class="fa-brands fa-github"></i>  Sign-in with GitHub
                    </a>
                </div>
                <div id="logged-in" class="hidden">
                    [USER] logged in
                </div>
            </div>

            <div id="menu-mobile" onclick="javascript:toggleMenu();">
                <i class="fa-solid fa-bars"></i> <span id="menu-mobile-text">MENU</span>
            </div>
            
            <div id="menu-entries">
                <div class="menu-entry" data-menu="dev" onClick="javascript:_scrollTo('develop-section');">
                    Develop
                </div>
                <div class="menu-entry" data-menu="eco" onClick="javascript:_scrollTo('projects-section');">
                    Ecosystem
                </div>
                <div class="menu-entry" data-menu="res" onClick="javascript:_scrollTo('helpers-section');">
                    Resources
                </div>
                <a href="https://confluxhub.io/bridge" class="menu-entry-link" target="_blank">
                    <div class="menu-entry" data-menu="bri">
                        Bridge
                    </div>
                </a>
                <div class="menu-entry is-mod hidden" data-menu="mod" onclick="javascript:toggleModMenu();">
                    . Mod Tools
                    <div class="menu-list" data-list="mod" id="menu-list-mod">
                        <div class="list-topic">Manage</div>
                        <div class="menu-link" onClick="javascript:_menu.getPage('mods');">
                            <i class="fa-solid fa-caret-right"></i>&nbsp; Moderators
                        </div>
                        <div class="menu-link" onClick="javascript:_menu.getPage('datasources');">
                            <i class="fa-solid fa-caret-right"></i>&nbsp; Datasources
                        </div>
                        <div class="menu-link" onClick="javascript:_menu.getPage('metrics');">
                            <i class="fa-solid fa-caret-right"></i>&nbsp; Metrics
                        </div>
                        <div class="menu-link" onClick="javascript:_menu.getPage('helpers');">
                            <i class="fa-solid fa-caret-right"></i>&nbsp; Helpers
                        </div>
                        
                    </div>
                </div>

            </div>
                    
        </div>  
    </div>

    <div id="header">

        <div id="header-content">

            <h1 id="title">Conflux Ecosystem</h1>

            <div id="metrics">

                <div class="metric" data-isViewed="scale-in1">
                    <div class="metric_desc">Total value locked</div>
                    <div class="metric_value">123.44M</div>
                </div>  

                <div class="metric" data-isViewed="scale-in2">
                    <div class="metric_desc">Transaction count</div>
                    <div class="metric_value">105.51M</div>
                </div>  

                <div class="metric" data-isViewed="scale-in3">
                    <div class="metric_desc">PoS staked CFX</div>
                    <div class="metric_value"><span class="tiny">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>2.11B CFX<span class="tiny">&nbsp;(23%)</span></div>
                </div>  

                <div class="metric" data-isViewed="scale-in3">
                    <div class="metric_desc">PoW & PoS nodes</div>
                    <div class="metric_value">73</div>
                </div>  
                
            </div>

        </div>

    </div>

    <div id="projects-section" class="clearfix">
        <h2 id="projects-heading">Browse Ecosystem Projects</h2>
        <div id="project-categories">-Categories loading-</div>
        <div id="projects-wrapper" class="clearfix">
            <div id="projects-search">
                <input id="projects-search-input" type="text" placeholder="Search" onkeyup="javascript:projectSearch();" />
                <div id="projects-search-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
            </div>
            <div id="projects" class="clearfix">-projects loading-</div>    
        </div>
        <!--
        <div class="add-project if-loggedin hidden">
            Add your own project:<br />
            <div class="button" onclick="javascript:getForm('addProject');">add project</div>   
        </div>
        -->
    </div>

    <div id="helpers-section" class="clearfix">

        <h2 id="helpers-heading">Contribute to the ecosystem</h2>

        <div id="helpers-list">

            <div class="helper-wrapper" data-isViewed="scale-in1">
                <div class="helper">
                    <div class="helper-heading">Get in Touch</div>
                    Reach out directly if you need more support for you project
                </div>
            </div>

            <div class="helper-wrapper" data-isViewed="scale-in2">
                <div class="helper" onclick="javascript:handleAddProject();">
                    <div class="helper-heading">Add your own project</div>
                    <div id="add-project-logged-out">
                        Sign-in with Github and add your project   
                    </div>
                    <div id="add-project-logged-in" class="hidden">
                        Fill the form and get your project listed
                    </div>
                </div>
            </div>

            <div class="helper-wrapper" data-isViewed="scale-in3">
                <div class="helper">
                    <div class="helper-heading">Learn how to build for Conflux</div>
                    For a walkthrough, start with the User Guide's Setup page
                </div>
            </div>

        </div>

    </div>

    <div id="develop-section" class="clearfix">

        <h2 id="develop-heading">Develop on Conflux</h2>

        <div class="connect-wrapper" data-isViewed="scale-in1">
            <div id="mainnet" class="connect">
                <div id="connect-mainnet">
                    <div class="connect-heading"><i class="fa-solid fa-wrench"></i> Setup ESpace mainnet</div>
                    <div class="connect-desc">
                        Connect wallet to add Conflux ESpace mainnet and interact with mainnet
                    </div>
                    <div class="connect-button-wrapper">
                        <div class="connect-button" id="mainnet-button" onClick="javascript:connectWallet('main');">Connect Wallet</div>
                    </div>
                </div>
                <div class="connect-link-wrapper">
                    <a href="https://evm.confluxscan.org/" class="connect-link" target="_blank">
                        <i class="fa-solid fa-caret-right"></i>&nbsp; ESpace Mainnet Explorer / Confluxscan
                    </a>
                </div>
                <div class="connect-link-wrapper">
                    <a href="https://doc.confluxnetwork.org/" class="connect-link" target="_blank">
                        <i class="fa-solid fa-caret-right"></i>&nbsp; Developer Docs
                    </a>
                </div>
                <div class="connect-link-wrapper">
                    <a href="https://conflux-faucets.com/" class="connect-link" target="_blank">
                        <i class="fa-solid fa-caret-right"></i>&nbsp; ESpace Mainnet Faucet
                    </a>
                </div>
                <div class="connect-link-wrapper">
                    <a href="https://confluxhub.io/bridge" class="connect-link" target="_blank">
                        <i class="fa-solid fa-caret-right"></i>&nbsp; Bridge
                    </a>
                </div>
            </div>
        </div>

         <div class="connect-wrapper" data-isViewed="scale-in1">
            <div id="testnet" class="connect">
                <div id="connect-testnet">
                    <div class="connect-heading"><i class="fa-solid fa-wrench"></i> Setup ESpace testnet</div>
                    <div class="connect-desc">
                        Connect wallet to add Conflux ESpace testnet and interact with testnet
                    </div>
                    <div class="connect-button-wrapper">
                        <div class="connect-button" id="testnet-button" onClick="javascript:connectWallet('test');">Connect Wallet</div>
                    </div>
                </div>
                <div class="connect-link-wrapper">
                    <a href="https://evmtestnet.confluxscan.org/" class="connect-link" target="_blank">
                        <i class="fa-solid fa-caret-right"></i>&nbsp; ESpace Testnet Explorer / 
                        Confluxscan
                    </a>
                </div>
                <div class="connect-link-wrapper">
                    <a href="https://doc.confluxnetwork.org/" class="connect-link" target="_blank">
                        <i class="fa-solid fa-caret-right"></i>&nbsp; Developer Docs
                    </a>
                </div>
                <div class="connect-link-wrapper">
                    <a href="https://efaucet.confluxnetwork.org/" class="connect-link">
                        <i class="fa-solid fa-caret-right"></i>&nbsp; ESpace Testnet Faucet
                    </a>
                </div>

            </div>
        </div>

    </div>

    <div id="footer-section" class="clearfix">
        <div id="footer" class="clearfix">
            <div id="footer-logo"><img src="files/Conflux_Primary_logo_with_White_Wordmark.svg" alt="Conflux" /></div>
            <div id="footer-links">
                Terms of Service<br />
                Privacy Policy</br />
            </div>
            <div id="footer-some">
                <div id="footer-some-heading">Follow Conflux</div>
                <div id="footer-some-links">
                    <a class="footer-some-link3" href="https://linktr.ee/confluxnetwork" title="LinkTree"><svg class="icon-lt2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 80 97.7" style="enable-background:new 0 0 80 97.7;" xml:space="preserve"><path d="M0.2,33.1h24.2L7.1,16.7l9.5-9.6L33,23.8V0h14.2v23.8L63.6,7.1l9.5,9.6L55.8,33H80v13.5H55.7l17.3,16.7l-9.5,9.4L40,49.1 	L16.5,72.7L7,63.2l17.3-16.7H0V33.1H0.2z M33.1,65.8h14.2v32H33.1V65.8z"></path></svg></a>
                    <a class="footer-some-link" href="https://x.com/Conflux_Network" title="X / Twitter"><i class="footer-link-icon fa-brands fa-x-twitter"></i></a>
                    <a class="footer-some-link2" href="https://discord.com/invite/confluxnetwork" title="Discord"><i class="footer-link-icon fa-brands fa-discord"></i></a>
                    <a class="footer-some-link" href="https://github.com/conflux-chain" title="GitHub"><i class="footer-link-icon fa-brands fa-github"></i></a>
                </div>
            </div>
            <div id="footer-built">
                Built by <a class="footer-built-link" href="https://webomatic.fi">Webomatic</a>
            </div>
        </div>
    </div>


    <!-- Popups -->
    <div id="popup1">
        <div id="popup1-box">
            <div id="popup1-close" class="popup-close" title="Close" onClick="javascript:popup.close(1)"><i class="fa-solid fa-xmark"></i></div>
            <div id="popup1-text"></div>
        </div>
    </div>

    <div id="popup2">
        <div id="popup2-box">
            <div id="popup2-close" class="popup-close" title="Close" onClick="javascript:popup.close(2)"><i class="fa-solid fa-xmark"></i></div>
            <div id="popup2-text"></div>
        </div>
    </div>

    <div id="popup3">
        <div id="popup3-box">
            <div id="popup3-close" class="popup-close"  title="Close" onClick="javascript:popup.close(3)"><i class="fa-solid fa-xmark"></i></div>
            <div id="popup3-text"></div>
        </div>
    </div>

    <div id="popup4">
        <div id="popup4-box">
            <div id="popup4-close" class="popup-close"  title="Close" onClick="javascript:popup.close(4)"><i class="fa-solid fa-xmark"></i></div>
            <div id="popup4-text"></div>
        </div>
    </div>

    <!-- scripts -->

    <!--<script type="module" src="files/calc.js"></script>-->
    <script>
        const HANDLER_URL = '<?=trim($handlerUrl)?>';
        const ERROR_COOKIE = '<?=trim($errorCookie)?>';
        const PUB_URL = '<?=trim($pubUrl)?>';
    </script>

    <script type="text/javascript">let modal = null; let _createAppKit, _EthersAdapter, _mainnet, _confluxESpace, _confluxESpaceTestnet;</script>
    <script type="text/javascript" src="files/ethers6.min.js"></script>
   <!-- <script type="text/javascript" src="files/walletconnect.web3modal.js"></script>
    <script type="text/javascript" src="files/walletconnect.web3provider.js"></script>
    <script type="text/javascript" src="files/walletconnect.universalprovider.js"></script> -->
    <script type="module">
        
        /*
        const projectId = 'a1fecde8027b92205ffcc8abb48819c8';

        const espaceMainnet = {
            chainId: 1,
            name: 'Conflux ESpace',
            currency: 'CFX',
            explorerUrl: 'https://evm.confluxscan.net',
            rpcUrl: "https://evm.confluxrpc.com",
        };

        const metadata = {
            name: 'Conflux Ecosystem Site',
            description: 'Learn about Conflux Ecosystem and browse Conflux ESpace projects',
            url: 'https://cfx.tools',
            icons: ['https://cfx.tools/cfx-eco.png']
        };
        */
        /*
        const espaceTestnet = {
            chainId: 71,
            name: 'Conflux ESpace Testnet',
            currency: 'CFX',
            explorerUrl: "https://evmtestnet.confluxscan.net/",
            rpcUrl: "https://evmtestnet.confluxrpc.com",
        };
        */     

        const projectId = 'a1fecde8027b92205ffcc8abb48819c8'

        // 2. Create your application's metadata object
        const metadata = {
            name: 'Conflux Ecosystem Site',
            description: 'Learn about Conflux Ecosystem and browse Conflux ESpace projects',
            url: 'https://cfx.tools',
            icons: ['https://cfx.tools/cfx-eco.png']
        }

        import { createAppKit, EthersAdapter, mainnet, confluxESpace, confluxESpaceTestnet } from './files/bundle3/testbundle.mjs'
              
        // 3. Create a AppKit instance
        modal = createAppKit({
            adapters: [new EthersAdapter()],
            networks: [mainnet, confluxESpace, confluxESpaceTestnet],
            metadata,
            projectId,
            features: {
                analytics: true
            }
        })

        _createAppKit = createAppKit;
        _EthersAdapter = EthersAdapter;
        _mainnet = mainnet;
        _confluxESpace = confluxESpace;
        _confluxESpaceTestnet = confluxESpaceTestnet;

        /*
        import { createWeb3Modal, defaultConfig } from './files/bundle/testbundle.mjs'
        
        modal = createWeb3Modal({
            ethersConfig: defaultConfig({ metadata }),
            chains: [espaceMainnet],
            projectId
        });
        */

        /*
        modaltest = createWeb3Modal({
            ethersConfig: defaultConfig({ metadata }),
            chains: [espaceTestnet],
            projectId
        });
        */
        
    </script>
    <script type="text/javascript" src="files/main.js?<?=UI_VER?>"></script>

    
    <?= CLOUDFLARE_ANALYTICS_HTML ?>
    
</body>
</html>
<?php


}
