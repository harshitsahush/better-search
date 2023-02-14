//Google url format : https://www.google.com/search?q=phone+site:reddit.com+OR+site:quora.com+OR+site:facebook.com&as_qdr=d
//as_qdr will be used to refer to the timeline

addEventListener("DOMContentLoaded", ()=>{  

    document.getElementById("main-search-box").focus();
    function uri_generator()
    {
        var uri = "https://www.google.com/search?q=";
        var input_string = document.getElementById("main-search-box").value;
        input_string = input_string.trim();                                  //remove whitespaces at beginning and the end
        uri = uri+input_string.replace(/ /g, "+");                           //replace all space with "+" and add into url

        var active_parameters = document.getElementsByClassName("active");
        let temp_flag1 = 0, temp_flag2 = 0;
        
        // to add all website active options
        Array.from(active_parameters).forEach(element => {                           
            if(element.classList.contains("website-option")){
                let temp;
                switch (element.innerText){
                    case "Reddit":
                        temp = "reddit.com";
                        break;
                    
                    case "Stack Overflow":
                        temp = "stackoverflow.com";
                        break;
                    
                    case "Twitter":
                        temp = "twitter.com";
                        break;

                    case "Github":
                        temp = "github.com";
                        break;
                }

                if(temp_flag1==0){
                    uri = uri + "+site:" + temp;
                    temp_flag1 = 1;
                }
                else{                                                                   // before 1st website we dont have to add OR
                    uri = uri + "+OR+site:" + temp;
                }
                
            }
        });
                
        // to add all file active options
        Array.from(active_parameters).forEach(element => {                           
            if(element.classList.contains("file-option")){
                let temp;
                switch (element.innerText){
                    case ".pdf":
                        temp = "pdf";
                        break;
                    
                    case ".docx":
                        temp = "docx";
                        break;
                        
                    case ".zip":
                        temp = "zip";
                        break;
                    
                    case ".pptx":
                        temp = "pptx";
                        break;
                }

                if(temp_flag2==0){
                    uri = uri + "+filetype:" + temp;
                    temp_flag2 = 1;
                }
                else{                                                                   // before 1st filetype we dont have to add OR
                    uri = uri + "+OR+filetype:" + temp;
                }
                
            }
        });

        // to add timeline of search results
        // tag only has to be added if any option other than "all time" is selected
        if(document.getElementsByName("time")[0].checked == false)
        {
            let temp;
            Array.from(document.getElementsByName("time")).forEach(element => {
                if(element.checked == true)
                {
                    temp = element.value;
                }
            });
            uri = uri + "&as_qdr=" + temp;
        }
        return uri;
    }

    //to activate options
    document.addEventListener("click", (e)=>{
        let temp_node = e.target, flag=0;
        //keep moving to parentnode until either .section-option is found or becomes null
        while(temp_node != null)
        {
            if(temp_node.classList.contains("section-option"))
            {
                flag = 1;
                break;
            }
            temp_node = temp_node.parentElement;
        }
        if(flag == 1)
        {
            temp_node.classList.toggle("active");
        }
    });

    //fired on click of search button
    document.addEventListener("click", (e)=>{
        if(document.getElementsByClassName("submit-button")[0].contains(e.target)){
            //will color the search tab red if empty
            if(document.getElementById("main-search-box").value == ""){
                document.getElementsByClassName("top")[0].style.backgroundColor = "rgba(255, 100, 100, 0.3)";
            } 
            else{
                var uri = uri_generator();                              //will collect data and form a url
                encodeURI(uri);                                         //will encode the url, i.e. replace special chars with escape sequences
                document.getElementById("main-search-box").value="";    //so that on coming back, box is empty
                window.location.href = uri;                             //will redirect to the constructed uri
            }
        }
    });

    //also fire the search function, when enter key is pressed anywhere in the document
    document.addEventListener("keydown", (e)=>{
        if(e.code == "Enter")
        {
            //will color the search tab red if empty
            if(document.getElementById("main-search-box").value == ""){
                    document.getElementsByClassName("top")[0].style.backgroundColor = "rgba(255, 100, 100, 0.3)";
            } 
            else{
                var uri = uri_generator();                              //will collect data and form a url
                encodeURI(uri);                                         //will encode the url, i.e. replace special chars with escape sequences
                document.getElementById("main-search-box").value="";    //so that on coming back, box is empty
                window.location.href = uri;                             //will redirect to the constructed uri
            }
        }
    });

});