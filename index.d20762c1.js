var element=document.querySelector(".pagination ul"),totalPages=20,page=1;function createPagination(a,n){var t="",e=n-1,c=n+1;n>1&&(t+='<li class="btn prev" onclick="createPagination(totalPages, '.concat(n-1,')"><span><i class="fas fa-angle-left"></i> Prev</span></li>')),n>2&&(t+='<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>',n>3&&(t+='<li class="dots"><span>...</span></li>')),n==a?e-=2:n==a-1&&(e-=1),1==n?c+=2:2==n&&(c+=1);for(var i=e;i<=c;i++)i>a||(0==i&&(i+=1),t+='<li class="numb '.concat(n==i?"active":"",'" onclick="createPagination(totalPages, ').concat(i,')"><span>').concat(i,"</span></li>"));return n<a-1&&(n<a-2&&(t+='<li class="dots"><span>...</span></li>'),t+='<li class="last numb" onclick="createPagination(totalPages, '.concat(a,')"><span>').concat(a,"</span></li>")),n<a&&(t+='<li class="btn next" onclick="createPagination(totalPages, '.concat(n+1,')"><span>Next <i class="fas fa-angle-right"></i></span></li>')),element.innerHTML=t,t}element.innerHTML=createPagination(totalPages,page);var currentPage=1,paginationContainer=document.querySelector(".pagination");paginationContainer.addEventListener("click",(function(a){return currentPage=a.currentTarget.querySelector(".active>span").textContent,console.log(currentPage),currentPage}));
//# sourceMappingURL=index.d20762c1.js.map