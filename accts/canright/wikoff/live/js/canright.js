//| Copyright 2011 Canright Systems. All rights reserved.
//| Canright Websites for Architects - www.canright.com - 503 459 4420
var VERSION="120207",sUA=navigator.userAgent,sDevice="mouse",bTouch=false;cShowIndex=-1;if(sUA.indexOf('Android')>=0)sDevice='android';else if(sUA.indexOf('iPad')>=0)sDevice='iPad';else if(sUA.indexOf('iPhone')>=0)sDevice='iPhone';if(sDevice!="mouse")bTouch=true;$(function(){for(var i in document.links)
document.links[i].onfocus = function(){this.blur()}})
function cImage(
sel,msTrans){if($(sel)[0].complete){$(sel).hide().fadeIn(msTrans);}else{setTimeout("cImage('"+sel+"',"+msTrans+")",QUICKCHK);}}
function cAlign(In){calign(
In.sel || '#content',parseInt(In.pad || 0)
);}
function calign(sel,kPad){var $e=$(sel),eh=$e.height();cntr();$(window).resize(function(){cntr()});function cntr(){var kHi=$(window).height();if(eh+kPad>kHi)$e.css('marginTop',(kPad-kHi/2))}}
var MAINSEL = '> a';SUBSEL = 'ul li';HREF = 'href';SELECTED = 'selected';PARENT = 'parent';DROPPER = 'ul';MSTRANS = 40;function cDrop(In){cdrop(
In.sel || '#cDrop',In.main || '',In.sub || '',In.trans || MSTRANS
);}
function cdrop(sel,sMain,sSub,msTrans){var $nav=$(sel).children();$(DROPPER,$nav).slideUp(0).css('visibility','visible');var idxMain=-1,idxSub =-1,sUrl=window.location.pathname,sM=(sMain!='')?sMain:sUrl,sS=(sSub !='')?sSub:sUrl;$nav.each(function(idxM){if($(MAINSEL,this).attr(HREF)==sM){if(idxMain==-1)idxMain=idxM;}else{$(SUBSEL,this).each(function(idxS){if($('a',this).attr(HREF)==sS){if(idxMain<0)idxMain=idxM;if(idxSub <0)idxSub =idxS;}});}});if(idxSub<0){if(idxMain>=0)$nav.eq(idxMain).addClass(SELECTED);}else{if(idxMain>=0){$nav.eq(idxMain).addClass(PARENT);$(DROPPER,$nav.eq(idxMain)).children().eq(idxSub).addClass(SELECTED);}}
$nav.hover(
function(){$(DROPPER,this).slideDown(msTrans)},function(){$(DROPPER,this).slideUp(msTrans)}
);}
var DELAY = 100;var NTRANS = 600;function cNav(In){cnav(
In.sel ||'#cNav',In.main || '',In.sub || '',In.trans || NTRANS,In.stay || true
);}
function cnav(sel,sMain,sSub,msTrans,bStay){var $nav=$(sel).children(),idxMain=-1,idxSub =-1,sUrl=window.location.pathname,sM=(sMain!='')?sMain:sUrl,sS=(sSub !='')?sSub:sUrl;$nav.each(function(idxM){if($(MAINSEL,this).attr(HREF)==sM){if(idxMain==-1)idxMain=idxM;}else{$(SUBSEL,this).each(function(idxS){if($('a',this).attr(HREF)==sS){if(idxMain<0)idxMain=idxM;if(idxSub <0)idxSub =idxS;}});}});if(idxSub<0){if(idxMain>=0)$nav.eq(idxMain).addClass(SELECTED);}else{if(idxMain>=0){$nav.eq(idxMain).addClass(PARENT);$(DROPPER,$nav.eq(idxMain)).fadeIn(DELAY).css('zIndex',400).children().eq(idxSub).addClass(SELECTED);}}
$nav.hover(
function(){if(!bStay || $nav.index(this)!=idxMain)$(DROPPER,this).stop(true,true).delay(DELAY).stop(true,true).fadeIn(msTrans)},function(){if(!bStay || $nav.index(this)!=idxMain)$(DROPPER,this).stop(true,true).delay(DELAY).stop(true,true).fadeOut(msTrans)}
);}
var NAVON = 'on',NAVNO = 'off',SELNO = '.slideNo',SELKT = '.slideCount',NAVFIRST = 'First',NAVPREV = 'Prev',NAVNEXT = 'Next',NAVLAST = 'Last',NAVBOXES = 'Boxes',NAVMODE = 'Mode',SLIDEPAD = 'padding',QUICKCHK = 100;function cShow(In){cshow(
In.sel || '#cShow',In.trans || 2000,In.pause || 1000,In.play || 'M',In.pick || 'I',In.order || 'S',In.effect || 'F',In.navs || '.nav',In.padding|| 0
);}
function cAuto(In){cshow(
In.sel || '#cAuto',In.trans || 2000,In.pause || 1000,In.play || 'C',In.pick || 'I',In.order || 'S',In.effect || 'F',In.navs || '.nav',In.padding|| 0
);}
function cshow(sel,msTrans,msPause,play,pick,order,effect,navPref,padding){play =parmass(play,'MCOA','M');pick =parmass(pick,'IP','I');order =parmass(order,'SH','S');effect =parmass(effect,'FHVARD','F');if(play=='A')play='C';var o,beat=0,f=function(){nxt();},swr=function(){showWhenReady();},$first=$(navPref+NAVFIRST),$prev =$(navPref+NAVPREV),$start=$(navPref+NAVFIRST+','+navPref+NAVPREV),$next =$(navPref+NAVNEXT),$last =$(navPref+NAVLAST),$end =$(navPref+NAVNEXT+','+navPref+NAVLAST),$boxes=$(navPref+NAVBOXES).children(),$mode =$(navPref+NAVMODE),$selno=$(SELNO),knt,beating=false,sox =-1,odx =-1,noff = 0,$sel,$slds,kPad=0,kShowing=-1;$sel =$(sel);$slds =$(sel).children();knt=$slds.length;if(!knt)return;$sel.hide().fadeIn(400);if('FARB'.indexOf(effect)>=0)$slds.hide();var sos=new Array(knt);kPad =parseInt($sel.attr(SLIDEPAD))||padding;$slds.each(function(ix){sos[ix]=ix;});if(order=='H')sos=shuffle(sos);$selno.html('1');$(SELKT).html(knt);if(play=='M')
showit(0);else{if(knt>1){beating=true;if(pick=='P')
$sel.hover(
function(){beating=false;clearTimeout(o);},function(){beating=true;nxt();}
);}
nxt();}
$first.click(function(){cShowGo('F')});$prev .click(function(){cShowGo('P')});$next .click(function(){cShowGo('N')});$last .click(function(){cShowGo('L')});$mode .click(function(){cShowGo('M')});$boxes.click(function(){cShowGo($boxes.index(this))});function nxt(){var bGo=true;if(++sox>=knt)
switch(play){case 'C':sox=0;break;case 'O':clearTimeout(o);bGo=false;beating=false;play='M';if(window.cShowOnce)cShowOnce();break;default:break;}
if(bGo)transit(sos[sox]);}
function transit(idx){if(idx>=0){kShowing=idx;showWhenReady();}
if(odx>=0){$slds.eq(odx).removeClass(NAVON);$boxes.eq(odx).removeClass(NAVON);if(odx==0)$start.removeClass(NAVNO);if(odx>=knt-1)$end.removeClass(NAVNO);if(window.cShowOut)cShowOut(idx);}
if(idx>=0){$slds.eq(idx).addClass(NAVON)
$boxes.eq(idx).addClass(NAVON);if(idx==0)$start.addClass(NAVNO);if(idx>=knt-1)$end.addClass(NAVNO);}
odx=idx;$selno.html(odx+1);}
function showit(idx){if(play!='M'){clearTimeout(o);play='M';beating=false;}
if(idx>=0 && idx<knt)
transit(idx);}
cShowGo=function(sInd){switch(sInd){case 'F':showit(0);break;case 'P':showit(odx-1);break;case 'N':showit(odx+1);break;case 'L':showit(knt-1);break;case 'C':if(odx<knt-1)
showit(odx+1);else
showit(0);break;case 'M':
if(play=='M'){play='C';beating=true;sox=odx;nxt();$mode.removeClass('manual').addClass('automatic');}else{play='M';beating=false;clearTimeout(o);$mode.removeClass('automatic').addClass('manual');}
break;default:showit(sInd);break;}};function shuffle(o){for(var j,x,i=o.length;i;j=parseInt(Math.random()*i,0),x=o[--i],o[i]=o[j],o[j]=x);return o;}
function parmass(p,v,d){if(p==undefined)p=d;if(v.indexOf(p)<0)p=d;return p;}
function showWhenReady(){if($slds.eq(kShowing)[0].complete){var kX=0,sX;switch(effect){case 'H':
$slds.each(function(i){if(i<kShowing)kX+=$(this).attr('width')+kPad});$sel.animate({'left':-kX},msTrans);break;case 'V':
$slds.each(function(i){if(i<kShowing)kX+=$(this).attr('height')+kPad});$sel.animate({'top':-kX},msTrans);break;case 'A':
if(odx<0||kShowing==odx)
$slds.eq(kShowing).fadeIn(msTrans);else{kX=(odx>kShowing)?-kPad:kPad;$slds.eq(kShowing).css({'left':kX}).show().animate({'left':0},msTrans);$slds.eq(odx).animate({'left':-kX},msTrans,function(){$(this).css({'left':0}).hide()});}
break;case 'R':
if(odx<0||kShowing==odx)
$slds.eq(kShowing).fadeIn(msTrans);else{$slds.eq(kShowing).css({'left':kPad}).show().animate({'left':0},msTrans);$slds.eq(odx).animate({'left':-kPad},msTrans,function(){$(this).css({'left':0}).hide()});}
break;case 'D':
if(odx<0||kShowing==odx)
$slds.eq(kShowing).fadeIn(msTrans);else{kX=(odx>kShowingx)?-kPad:kPad;$slds.eq(kShowing).css({'top':kX}).show().animate({'top':0},msTrans);$slds.eq(odx).animate({'top':-kX},msTrans,function(){$(this).css({'top':0}).hide()});}
break;case 'F':
default:
if(odx>=0)
$slds.eq(odx).fadeOut(msTrans);$slds.eq(kShowing).fadeIn(msTrans);break;}
cShowIndex=kShowing;if(window.cShowIn)cShowIn(kShowing);if(knt>1 && beating && 'COA'.indexOf(play)>=0)o=setTimeout(f,msPause+msTrans);}else{setTimeout(swr,QUICKCHK);}}}
function cPan(In){cpan(
In.sel || '#cPan',parseInt(In.ms || 200),parseInt(In.px || 240),In.panUp || '#panUp',In.panDn || '#panDn'
);}
function cpan(sel,msMov,pxMov,sPanUp,sPanDn){var $scr=$(sel),$pan=$scr.children(),$panUp=$(sPanUp),$panDn=$(sPanDn),scrt=parseInt($scr.offset().top),scrh=$scr.height(),panh=$pan.height()
maxh=scrh-panh-1;if(panh>scrh){$panDn.addClass('on');$scr.css('cursor','pointer').click(function(e){if(parseInt(e.pageY)-scrt<scrh/2)pUp();else pDn();});$panUp.click(function(){pUp()});$panDn.click(function(){pDn()});}
function pUp(){var kTo=Math.min(0,parseInt($pan.css('top'))+pxMov);$pan.animate({'top':kTo},msMov);$panUp.removeClass('on');if(kTo<0)$panUp.addClass('on');if(panh>scrh && kTo>maxh)$panDn.removeClass('on').addClass('on');}
function pDn(){var kTo=Math.max(parseInt($pan.css('top'))-pxMov,maxh);$pan.animate({'top':kTo},msMov);$panDn.removeClass('on');if(kTo<0)$panUp.removeClass('on').addClass('on');if(panh>scrh && kTo>maxh)$panDn.addClass('on');}}
function cScroll(In){var sSel = In.sel || In.selector || '#cScroll';cscroll(
sSel,In.cellsPerPage || 1,In.cellsPerMove || 1,In.pixelsPerCell|| 124,In.direction || 'V',In.previous || '#prev',In.next || '#next',In.pause || 0,In.pick || 'P',In.initial || 0
);}
function cscroll(
sel,cpp,cpm,ppc,dir,prv,nxt,msp,pik,ini){if(sel==undefined)sel='#cScroll';var $cells=$(sel),cells=$(sel+' a').length,$prv=$(prv),$nxt=$(nxt),cTop=0,o,f=function(){anx();}
;if(cells==undefined)cells=0;if(ini<0)ini=0;if(ini>=cells-cpp)ini=cells-cpp;if(ini>0)scroller(ini);if(msp>0)auto(msp);$prv.click(function(){scroller((cTop>0)?cTop-cpm:0);});$nxt.click(function(){scroller((cTop<cells-cpp)?cTop+cpm:cells-cpp);});$prv.hover(
function(){if(cTop>0)$(this).addClass("active");},function(){$(this).removeClass("active");}
);$nxt.hover(
function(){if(cTop<cells-cpp)$(this).addClass("active");},function(){$(this).removeClass("active");}
);function auto(ms){o=setInterval(f,ms);if(pik=='P')
$(sel).hover(
function(){clearInterval(o);},function(){o=setInterval(f,ms);}
);}
function anx(){scroller((cTop<cells-cpp)?cTop+cpm:0);}
function scroller(kTo){if(dir=='H')
$cells.animate({left:'+='+(cTop-kTo)*ppc},'slow');else
$cells.animate({top:'+='+(cTop-kTo)*ppc},'slow');cTop=kTo;}}
function cCells(In){var sSel = In.sel || In.selector || '#cCells a';var ini =(In.initial==undefined)?-1:In.initial;ccells(
sSel,In.effects || '',ini,In.current || ''
);}
function ccells(
sel,eff,ini,cur)
{if(sel==undefined)sel='#cCells a';if(eff==undefined)eff='';if(ini==undefined)ini=-1;if(cur==undefined)cur='';if(cur=='')cur=eff;var $cells=$(sel),cells=$cells.length,msDurr=400;if(cells==undefined)cells=0;if(ini>=cells)ini=cells-1;$cells.each(function(){$(this).attr('class','pagOn').show();});if(ini>=0)curr();effs();function curr(){$ini=$cells.eq(ini);$ini.addClass("current");var aEff=cur.split(';'),aE,sE,sD,sP;var sHd,sHo,sCd,sCp,x;for(var k=0;k<aEff.length;++k){aE=aEff[k].split(',');sE=(aE.length>0)?aE[0]:'N';sD=(aE.length>1)?aE[1]:msDurr;if(aE.length>2)sP=aE[2];else sP=(sE=='H')?1.0:0;switch(sE){case 'H':
$ini.fadeTo(sD,sP);break;case 'C':
$('div',$ini).animate({bottom:'+='+($('div',$ini).height()+parseInt(sP))},sD);break;case 'G':
$('div',$ini).animate({top:'+='+($('div',$ini).height()+parseInt(sP))},sD);break;default:
break;}}}
function effs(){var aEff=eff.split(';'),aE,sE,sD,sP;for(var k=0;k<aEff.length;++k){aE=aEff[k].split(',');sE=(aE.length>0)?aE[0]:'N';sD=(aE.length>1)?aE[1]:msDurr;if(aE.length>2)sP=aE[2];else sP=(sE=='H')?1.0:0;var $h,dH,oH,hH;var $c,dC,pC,hC;switch(sE){case 'H':
dH = sD;hH = sP;$('.pagOn').fadeTo(dH,hH);$cells.hover(
function(){$h=$('img',$(this));oH=$h.css('opacity');$h.fadeTo(dH,hH)},function(){$h.fadeTo(dH,oH)}
);break;case 'C':
dC = sD;pC = parseInt(sP);$cells.hover(
function(){$c=$('div',$(this));hC=$c.height()+pC;if(!$(this).hasClass('current'))$c.animate({bottom:'+='+hC},dC)},function(){if(!$(this).hasClass('current'))$c.animate({bottom:'-='+hC},"fast");}
);break;case 'G':
dH = sD;pC = parseInt(sP);$cells.hover(
function(){$c=$('div',$(this));$c.animate({top:'+='+pC},dC)},function(){$c.animate({top:'-='+pC},"fast")}
);break;default:
break;}}}}
var SETNAV = '#setsNav'
SETNO = '.setsNo',SETKT = '.setsCount',SETFIRST = '.setsFirst',SETPREV = '.setsPrev',SETNEXT = '.setsNext',SETLAST = '.setsLast',SETBOXES = '.setsBoxes';function cSets(In){csets(
InSel || '#cSets',In.slots || 0,In.effect || 'F',In.set || 0,In.item || 0);}
function csets(
sel,kSlots,effect,iSet,iItem){if(sel==undefined)sel='#cSets';if(kSlots==undefined)kSlots=0;if(iSet==undefined)iSet=0;if(iItem==undefined)iItem=0;var $items=$(sel).children(),kSets=0,$boxes=$(SETBOXES).children();prepSets();if(iItem>0)iSet=(kSlots==0)?0:Math.floor((iItem)/kSlots);showSet(iSet);$(SETFIRST).click(function(){cSetsGo('F')});$(SETPREV).click(function(){cSetsGo('P')});$(SETNEXT).click(function(){cSetsGo('N')});$(SETLAST).click(function(){cSetsGo('L')});$boxes .click(function(){cSetGo($boxes.index(this))});function prepSets(){var iSlot,lSlot=-1;$items.each(function(){iSlot=parseInt($(this).data('slot'),0);if(isNaN(iSlot)){iSlot=lSlot+1;$(this).data('slot',iSlot);}else{if(iSlot<=lSlot){iSlot=lSlot+1;$(this).data('slot',iSlot);}}
$(this).data('set',(kSlots==0)?0:Math.floor((iSlot)/kSlots));lSlot=iSlot;});kSets=(kSlots==0||lSlot<0)?0:Math.floor((lSlot)/kSlots)+1;if(kSets>1){$(SETKT).html(kSets);}else{$('"'+SETNAV+','+SETNO+','+SETKT+','+SETFIRST+','+SETPREV+','+SETNEXT+','+SETLAST+','+SETBOXES+'"').hide();}}
function showSet(idx){var kSet;if(idx>=0 && idx<kSets){iSet=idx;switch(effect){case 'F':
$items.each(function(idx){kSet=parseInt($(this).data('set'));if(kSet==iSet)
$(this).fadeIn(msTrans);else
$(this).fadeOut(msTrans);});break;}}}
cSetsGo=function(sInd){switch(sInd){case 'F':showSet(0);break;case 'P':showSet(iSet-1);break;case 'N':showSet(iSet+1);break;case 'L':showSet(kSets-1);break;case 'C':if(iSet<kSets-1)
showSet(iSet+1);else
showSet(0);break;default:showSet(sInd);break;}};}
function parmass(p,v,d){if(p==undefined)p=d;if(v.indexOf(p)<0)p=d;return p;}
function preImg($i,rs,ix){if($i.complete)return true;else{$i.load(function(){rs[ix]=true;});return false;}}
String.prototype.scram=function(){return this.split("").reverse().join("").replace("*","@").replace(",",".");}
function scramble(sel,stuff){$(sel).html(stuff.scram())}
function scramref(sel,stuff){$(sel).attr('href',':otliam'.scram()+stuff.scram())}
function scramail(sel,stuff){$(sel).attr('href',':otliam'.scram()+stuff.scram()).html(stuff.scram())}
function cGrid(In){var id=In.id||'cGrid';var sSel=In.sel;if(sSel==undefined)sSel=In.selector;if(sSel==undefined)sSel='#'+id;cgrid(
sSel,id,In.imagesPerPage || 0,In.reveal || 'F',In.effects || '',In.navSelector ||'#Nav',In.onSqn || 1);}
function cgrid(
sel,id,ipp,reveal,effects,selN,onSqn){if(id==undefined)id='cGrid';if(sel==undefined)sel='#'+id;if(ipp==undefined)ipp=0;reveal=parmass(reveal,'FNS','F');if(effects==undefined)effects='';if(onSqn==undefined)onSqn=1;var $grid =$(sel),$cells=$(sel +' a'),$prev =$(selN+' .prev'),$next =$(selN+' .next'),$nfo =$(selN+' .pager'),pag=(ipp==0)?1:Math.floor((onSqn-1)/ipp)+1,pags,cells=0,sNav='',msCheck=200,msDurr=400,o;var aRev=reveal.split(':'),revDur=(aRev.length>1)?aRev[1]:msDurr;prepGrid();gridPage(pag);effs();$prev.click(function(){if(pag>1)gridPage(--pag);});$next.click(function(){if(pag<pags)gridPage(++pag);});function effs(){var aEff=effects.split(';'),aE,sE,sD,sP;var sHd,sHo,sCd,sCp,x;for(var k=0;k<aEff.length;++k){aE=aEff[k].split(',');sE=(aE.length>0)?aE[0]:'N';sD=(aE.length>1)?aE[1]:msDurr;if(aE.length>2)sP=aE[2];else sP=(sE=='H')?1.0:0;switch(sE){case 'H':
sHd = sD;sHo = sP;$('.pagOn').fadeTo(sHd,sHo);$cells.hover(
function(){$(this).fadeTo(sHd,1.0);},function(){$(this).fadeTo(sHd,sHo);}
);break;case 'C':
sCd = sD;sCp = parseInt(sP);if(bTouch){$cells.each(function(){x=$('div',$(this)).height()+sCp;if(!$(this).hasClass('current'))$(this).find('div').animate({bottom:'+='+x},sCd);});}else{$cells.hover(
function(){x=$('div',$(this)).height()+sCp;if(!$(this).hasClass('current'))$(this).find('div').animate({bottom:'+='+x},sCd)},function(){if(!$(this).hasClass('current'))$(this).find('div').animate({bottom:'-='+x},"fast");}
);}
break;case 'G':
sCd = sD;sCp = parseInt(sP);$cells.hover(
function(){$(this).find('div').animate({top:'+='+sCp},sCd)},function(){$(this).find('div').animate({top:'-='+sCp},"fast")}
);break;default:
break;}}}
function prepGrid(){var sqo,iSqn;$cells.each(function(ix){sqo=parseInt($(this).attr('sqn'),0);if(isNaN(sqo))iSqn=cells+1;else if(sqo==iSqn)iSqn=cells+1;else iSqn=sqo;if(iSqn!=sqo)$(this).attr('sqn',iSqn);if(iSqn>cells)cells=iSqn;});pags=(ipp==0)?1:Math.floor((cells-1)/ipp)+1;if(pags>1){sNav=$nfo.html().replace('PGS',pags);}else $(selN).hide();if(reveal.length){if(!presentable())
o=setInterval(
function(){if(presentable())
clearInterval(o);},msCheck);}}
function presentable(){for(var k=0;k<$cells.length && $cells.eq(k).attr('sqn')<=ipp;++k){if(!$cells.eq(k).children('img')[0].complete){return false;}}
reveal='';for(var k=0;k<$cells.length;++k){$cells.eq(k).children('img').hide().css('visibility','visible').fadeIn(800);}
return true;}
function gridPage(p){var iSqn;pag=p;$cells.each(function(){iSqn = parseInt($(this).attr('sqn'),0);if(ipp==0 ||(iSqn>(pag-1)*ipp&&iSqn<=pag*ipp))
$(this).attr('class','pagOn').attr('id','c'+(iSqn-((pag-1)*ipp))).show();else
$(this).attr('class','pagNo').removeAttr('id').hide();});if(pags>1)
$nfo.html(sNav.replace("PG",pag));}
function parmass(p,v,d){if(p==undefined)p=d;if(v.indexOf(p)<0)p=d;return p;}
function preImg($i,rs,ix){if($i.complete)return true;else{$i.load(function(){rs[ix]=true;});return false;}}}
