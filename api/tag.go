package api

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	coolapk "github.com/XiaoMengXinX/CoolapkApi-Go"
	ent "github.com/XiaoMengXinX/CoolapkApi-Go/entities"
)

func TagFeedHandler(w http.ResponseWriter, r *http.Request) {
	authToken := r.Header.Get("X-Internal-Auth")
	expectedToken := os.Getenv("INTERNAL_AUTH_TOKEN")

	if expectedToken != "" && authToken != expectedToken {
		log.Printf("Unauthorized access attempt from %s", r.RemoteAddr)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	tag := r.URL.Query().Get("tag")
	if tag == "" {
		http.Error(w, "Query parameter 'tag' is required", http.StatusBadRequest)
		return
	}

	pageStr := r.URL.Query().Get("page")
	page := 1
	if pageStr != "" {
		var err error
		page, err = strconv.Atoi(pageStr)
		if err != nil {
			http.Error(w, "Query parameter 'page' must be a valid integer", http.StatusBadRequest)
			return
		}
	}

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	c := coolapk.New()
	var tagFeedList *ent.TagFeedList
	var err error
	tagFeedList, err = c.GetTagFeedListWithCtx(tag, page, ctx)
	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			log.Printf("Request timed out for tag %s, page %d: %v", tag, page, err)
			http.Error(w, "The request to Coolapk API timed out", http.StatusGatewayTimeout)
			return
		}
		log.Printf("Error calling GetTagFeedListWithCtx for tag %s, page %d: %v", tag, page, err)
		http.Error(w, "Failed to fetch data from Coolapk API", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Cache-Control", "s-maxage=600, stale-while-revalidate=0")

	statusCode := tagFeedList.StatusCode
	if statusCode == 0 {
		statusCode = http.StatusOK
	}
	w.WriteHeader(statusCode)
	_, _ = w.Write([]byte(tagFeedList.Response))
}
