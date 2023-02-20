package com.dairo.hiddentakeoffs.exceptions;

public class TakeoffAlreadyExistsExceptionResponse {

/*    private Long lat;

    private Long lng;

    public TakeoffAlreadyExistsExceptionResponse(Long lat, Long lng) {
        this.lat = lat;
        this.lng = lng;
    }

    public Long getLat() {
        return lat;
    }

    public void setLat(Long lat) {
        this.lat = lat;
    }

    public Long getLng() {
        return lng;
    }

    public void setLng(Long lng) {
        this.lng = lng;
    }*/

        private String latlng;

    public TakeoffAlreadyExistsExceptionResponse(String latlng) {
        this.latlng = latlng;
    }

    public String getLatlng() {
        return latlng;
    }

    public void setLatlng(String latlng) {
        this.latlng = latlng;
    }
}
